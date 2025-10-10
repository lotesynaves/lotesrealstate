export interface Agent {
  id: number;
  name: string;
  position: string;
  experience: string;
  description: string;
  image: string;
  phone: string;
  whatsapp: string; // Número en formato internacional sin signos, ej: 5215512345678
  email: string;
  specialties: string[];
}

export const agents: Agent[] = [
  {
    id: 1,
    name: 'Ana Martínez',
    position: 'Directora de Ventas',
    experience: '12+ años de experiencia',
    description: 'Especializada en propiedades industriales y parques empresariales. Su amplia red de contactos y conocimiento del mercado la convierten en la mejor opción para encontrar tu propiedad ideal.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=688&q=80',
    phone: '+52 55 1234 5678',
    whatsapp: '525512345678',
    email: 'ana.martinez@industrialrealtyhub.com',
    specialties: ['Propiedades industriales', 'Parques empresariales', 'Asesoría fiscal']
  },
  {
    id: 2,
    name: 'Carlos Rodríguez',
    position: 'Asesor Senior',
    experience: '8+ años de experiencia',
    description: 'Experto en logística y distribución, con un enfoque en ubicaciones estratégicas para centros de distribución y almacenes.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    phone: '+52 55 2345 6789',
    whatsapp: '525523456789',
    email: 'carlos.rodriguez@industrialrealtyhub.com',
    specialties: ['Logística', 'Centros de distribución', 'Almacenes']
  },
  {
    id: 3,
    name: 'Laura Sánchez',
    position: 'Asesora Comercial',
    experience: '6+ años de experiencia',
    description: 'Especialista en propiedades comerciales e industriales, con un enfoque en startups y empresas en crecimiento.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    phone: '+52 55 3456 7890',
    whatsapp: '525534567890',
    email: 'laura.sanchez@industrialrealtyhub.com',
    specialties: ['Startups', 'Empresas en crecimiento', 'Oficinas industriales']
  }
];
