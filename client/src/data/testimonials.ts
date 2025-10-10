export interface Testimonial {
  id: number;
  clientName: string;
  clientImage: string;
  propertyImage: string;
  role: string;
  comment: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    clientName: 'Roberto Mendoza',
    clientImage: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    propertyImage: 'https://images.unsplash.com/photo-1605152276897-4f618f831968?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    role: 'CEO, Logística Avanzada',
    comment: 'Excelente servicio y asesoría personalizada. Encontraron el almacén perfecto para nuestra operación en tiempo récord.',
    rating: 5
  },
  {
    id: 2,
    clientName: 'María González',
    clientImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    propertyImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    role: 'Directora de Operaciones, TechCorp',
    comment: 'Gracias al equipo por su profesionalismo. La nave industrial que nos consiguieron cumple con todos los requisitos de nuestro negocio en expansión.',
    rating: 5
  },
  {
    id: 3,
    clientName: 'Carlos Ruiz',
    clientImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    propertyImage: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80',
    role: 'Gerente General, Almacenes del Norte',
    comment: 'La mejor experiencia en bienes raíces industriales. Nos ayudaron a encontrar la ubicación estratégica perfecta para nuestro centro de distribución.',
    rating: 4
  }
];
