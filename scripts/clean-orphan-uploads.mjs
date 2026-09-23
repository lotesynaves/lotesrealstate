// Limpieza de carpetas huérfanas `properties/nuevo-*` en el bucket de Storage.
//
// Una carpeta `nuevo-<uuid>/` es HUÉRFANA solo si NINGUNA fila de
// `properties_assets` referencia una URL dentro de ella. Ojo: las propiedades
// creadas desde "Agregar" guardan sus imágenes bajo `nuevo-<uuid>/` (el código
// no las mueve), así que NO todas las `nuevo-*` son basura. Este script cruza
// Storage contra la BD y borra únicamente lo que de verdad no se usa.
//
// Uso (uno-off, local; requiere la SERVICE_ROLE key, NO la anon):
//   SUPABASE_URL=https://xxxx.supabase.co \
//   SUPABASE_SERVICE_ROLE=eyJ... \
//   node scripts/clean-orphan-uploads.mjs           # DRY-RUN: solo lista
//   node scripts/clean-orphan-uploads.mjs --apply   # borra de verdad
//
// La service_role salta RLS: necesaria para leer todas las filas y borrar del
// bucket. Es un script de mantenimiento que corres tú; nunca va al cliente.

import { createClient } from '@supabase/supabase-js';

const URL = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE;
const BUCKET = 'lotesynaves';
const PREFIX = 'properties';
const APPLY = process.argv.includes('--apply');

if (!URL || !KEY) {
  console.error('Faltan SUPABASE_URL y/o SUPABASE_SERVICE_ROLE en el entorno.');
  process.exit(1);
}

const supabase = createClient(URL, KEY);

// 1) Junta todos los nombres de carpeta `nuevo-*` referenciados en la BD.
const referenced = new Set();
const { data: rows, error: dbErr } = await supabase
  .from('properties_assets')
  .select('cover_image, images');
if (dbErr) {
  console.error('Error leyendo properties_assets:', dbErr.message);
  process.exit(1);
}
const marker = `/storage/v1/object/public/${BUCKET}/${PREFIX}/`;
const collect = (url) => {
  if (typeof url !== 'string') return;
  const i = url.indexOf(marker);
  if (i === -1) return;
  const rest = url.slice(i + marker.length); // p.ej. "nuevo-abc/img.webp"
  const folder = rest.split('/')[0];
  if (folder.startsWith('nuevo-')) referenced.add(folder);
};
for (const r of rows) {
  collect(r.cover_image);
  if (r.images && typeof r.images === 'object') {
    for (const v of Object.values(r.images)) collect(v);
  }
}

// 2) Lista las carpetas `nuevo-*` que existen en el bucket.
const { data: entries, error: lsErr } = await supabase.storage
  .from(BUCKET)
  .list(PREFIX, { limit: 10000 });
if (lsErr) {
  console.error('Error listando el bucket:', lsErr.message);
  process.exit(1);
}
// En Storage las carpetas aparecen como entradas con id === null.
const folders = entries
  .filter((e) => e.id === null && e.name.startsWith('nuevo-'))
  .map((e) => e.name);

// 3) Huérfanas = existen en Storage pero nadie las referencia.
const orphans = folders.filter((f) => !referenced.has(f));

console.log(`Carpetas nuevo-* en Storage: ${folders.length}`);
console.log(`Referenciadas por propiedades:  ${referenced.size}`);
console.log(`Huérfanas a borrar:             ${orphans.length}`);
if (orphans.length === 0) {
  console.log('Nada que borrar. ✔');
  process.exit(0);
}

let removed = 0;
for (const folder of orphans) {
  const dir = `${PREFIX}/${folder}`;
  const { data: files, error: fErr } = await supabase.storage
    .from(BUCKET)
    .list(dir, { limit: 10000 });
  if (fErr) {
    console.error(`  ! No pude listar ${dir}: ${fErr.message}`);
    continue;
  }
  const paths = files.map((f) => `${dir}/${f.name}`);
  console.log(`  ${APPLY ? 'BORRANDO' : 'dry-run'} ${dir}  (${paths.length} archivos)`);
  if (APPLY && paths.length) {
    const { error: rmErr } = await supabase.storage.from(BUCKET).remove(paths);
    if (rmErr) console.error(`  ! Error borrando ${dir}: ${rmErr.message}`);
    else removed += paths.length;
  }
}

console.log(
  APPLY
    ? `Listo. Archivos borrados: ${removed}.`
    : 'DRY-RUN: no se borró nada. Repite con --apply para aplicar.',
);
