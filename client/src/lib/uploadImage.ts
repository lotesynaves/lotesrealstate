import { supabase } from '@/lib/supabase';

// Bucket de Supabase Storage donde viven las imágenes de propiedades.
// Debe existir, ser público y tener políticas de INSERT/DELETE para
// usuarios `authenticated`. NUNCA se usa service_role aquí: el cliente ya
// lleva el JWT de la sesión del admin.
export const BUCKET = 'lotesynaves';

// Marcador de una URL pública de este bucket. Sirve para saber si una URL
// nos pertenece (y por tanto podemos borrar el archivo) o es externa.
const PUBLIC_MARKER = `/storage/v1/object/public/${BUCKET}/`;

// Máximo de imágenes por propiedad.
export const MAX_IMAGES = 10;

// Entrada: tipos permitidos y peso máximo del archivo ORIGINAL (antes de comprimir).
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_INPUT_BYTES = 10 * 1024 * 1024; // 10 MB

// Parámetros de compresión.
const MAX_SIDE = 1600; // lado mayor máximo en px
const QUALITY = 0.8;

export interface UploadResult {
  url: string;
  path: string;
  originalSize: number;   // bytes del archivo original
  compressedSize: number; // bytes de lo que realmente se subió
}

/** Formatea bytes a un texto legible (KB / MB). */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** ¿La URL apunta a un archivo dentro de nuestro bucket público? */
export function isBucketUrl(url: string | null | undefined): boolean {
  return !!url && url.includes(PUBLIC_MARKER);
}

/** Siguiente llave numérica libre para el objeto `images` (evita colisiones). */
export function nextImageKey(images: { [k: string]: string }): string {
  const ns = Object.keys(images).map(Number).filter((n) => !Number.isNaN(n));
  return String((ns.length ? Math.max(...ns) : 0) + 1);
}

/** Limpia el nombre original: sin acentos, sin caracteres raros, en minúsculas. */
function sanitizeBaseName(name: string): string {
  const base = name.replace(/\.[^.]+$/, ''); // quita extensión
  return (
    base
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, "") // quita acentos
      .replace(/[^a-zA-Z0-9]+/g, '-')  // no alfanumérico -> guion
      .replace(/^-+|-+$/g, '')          // recorta guiones extremos
      .toLowerCase()
      .slice(0, 40) || 'img'
  );
}

/** ¿El navegador soporta exportar canvas a WebP? */
function supportsWebp(): boolean {
  try {
    const c = document.createElement('canvas');
    c.width = 1;
    c.height = 1;
    return c.toDataURL('image/webp').startsWith('data:image/webp');
  } catch {
    return false;
  }
}

/**
 * Comprime y redimensiona en el navegador con canvas (sin librerías).
 * - Lado mayor máximo 1600 px (mantiene proporción).
 * - WebP calidad 0.8; si no hay soporte, JPEG calidad 0.8.
 * - Respeta la orientación EXIF (createImageBitmap imageOrientation).
 */
async function compressImage(
  file: File,
): Promise<{ blob: Blob; mime: string; ext: string }> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
  } catch {
    // Fallback para navegadores sin soporte de la opción imageOrientation.
    bitmap = await createImageBitmap(file);
  }

  const { width, height } = bitmap;
  let w = width;
  let h = height;
  if (Math.max(w, h) > MAX_SIDE) {
    const scale = MAX_SIDE / Math.max(w, h);
    w = Math.round(w * scale);
    h = Math.round(h * scale);
  }

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('No se pudo procesar la imagen en este navegador.');
  ctx.drawImage(bitmap, 0, 0, w, h);
  if (typeof bitmap.close === 'function') bitmap.close();

  const webp = supportsWebp();
  const mime = webp ? 'image/webp' : 'image/jpeg';
  const ext = webp ? 'webp' : 'jpg';

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, mime, QUALITY),
  );
  if (!blob) throw new Error('No se pudo comprimir la imagen.');

  return { blob, mime, ext };
}

/**
 * Valida, comprime y sube UNA imagen al bucket, en `properties/<folder>/`.
 * Devuelve la URL pública (getPublicUrl) y los pesos antes/después.
 * Lanza Error con mensaje en español si algo no cumple.
 */
export async function uploadPropertyImage(
  file: File,
  folder: string,
): Promise<UploadResult> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error(
      `«${file.name}» no es un formato válido. Solo se permiten JPG, PNG o WebP.`,
    );
  }
  if (file.size > MAX_INPUT_BYTES) {
    throw new Error(
      `«${file.name}» pesa ${formatBytes(file.size)}. El máximo permitido es 10 MB.`,
    );
  }

  const { blob, mime, ext } = await compressImage(file);

  const path = `properties/${folder}/${sanitizeBaseName(file.name)}-${crypto.randomUUID()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, blob, { upsert: false, contentType: mime });

  if (uploadError) {
    throw new Error(`Error al subir «${file.name}»: ${uploadError.message}`);
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);

  return {
    url: data.publicUrl,
    path,
    originalSize: file.size,
    compressedSize: blob.size,
  };
}

/**
 * Borra del bucket el archivo apuntado por una URL pública, SOLO si esa URL
 * pertenece a nuestro bucket. Si es externa, no hace nada.
 */
export async function deleteBucketImageByUrl(
  url: string | null | undefined,
): Promise<void> {
  if (!isBucketUrl(url)) return; // externa o vacía: no tocar
  const marker = PUBLIC_MARKER;
  const path = decodeURIComponent((url as string).split(marker)[1] || '');
  if (!path) return;
  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) {
    // No abortamos el flujo por un fallo de limpieza; solo lo registramos.
    console.error('No se pudo borrar del bucket:', path, error.message);
  }
}
