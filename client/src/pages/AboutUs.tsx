import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { AgentCard } from '@/components/AgentCard';
import { TestimonialCard } from '@/components/TestimonialCard';
import { agents } from '@/data/agents';
import { testimonials } from '@/data/testimonials';


const scrollToSection = (id: string) => {
  if (typeof window !== 'undefined') {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update URL without triggering a full page reload
      window.history.pushState(null, '', `/#${id}`);
    }
  }
};

const scrollToSectionFromUrl = () => {
  if (typeof window !== 'undefined') {
    const hash = window.location.hash.substring(1);
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }
};

export default function AboutUs() {
  const [location, navigate] = useLocation();
  const [darkMode, setDarkMode] = useState(() => {
    // Check for saved theme preference or system preference
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
  };

  // Apply dark mode class to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Create a wrapper for navigation that ensures smooth scrolling
  const navigateWithScroll = (path: string) => {
    navigate(path);
    const sectionId = path.split('#')[1];
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  };

  useEffect(() => {
    // Handle initial page load with hash
    if (location.includes('#')) {
      scrollToSectionFromUrl();
    }

    // Handle browser back/forward navigation
    const handlePopState = () => {
      if (location.includes('#')) {
        scrollToSectionFromUrl();
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [location]);

  const handleNavigation = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    navigateWithScroll(path);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">


      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-blue-800 dark:from-dark-800 dark:to-dark-900 h-[50vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80')] bg-cover bg-center mix-blend-overlay" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Acerca de Nosotros
            </h1>
            <p className="text-xl text-gray-100 max-w-2xl mx-auto leading-relaxed">
              Conoce más sobre nuestra misión, visión y el equipo detrás de Industrial Realty Hub
            </p>
          </div>
        </div>
      </div>

      {/* Sección de Información */}
      <section className="relative py-16 bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
        {/* Background pattern - only visible in dark mode */}
        <div className="absolute inset-0 hidden dark:block">
          <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800/70 dark:backdrop-blur-sm dark:rounded-2xl dark:shadow-2xl dark:border dark:border-gray-700/50 dark:overflow-hidden p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              {/* Imagen */}
              <div className="relative h-full min-h-[24rem] rounded-xl overflow-hidden shadow-xl transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                <img
                  src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                  alt="Nuestro Equipo"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Texto */}
              <div className="space-y-6 flex flex-col h-full justify-center">
                <div>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg">Quiénes Somos</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                    Líderes en Bienes Raíces Industriales
                  </h2>
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  En Industrial Realty Hub nos especializamos en ofrecer soluciones integrales en bienes raíces industriales, conectando a compradores y vendedores en el mercado industrial con un enfoque profesional y personalizado.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start space-x-4 max-w-lg group">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/70 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Más de 10 años de experiencia</h3>
                      <p className="text-gray-600 dark:text-gray-300">Líderes en el mercado de bienes raíces industriales con una trayectoria comprobada.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 max-w-lg group">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/70 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Amplio portafolio de propiedades</h3>
                      <p className="text-gray-600 dark:text-gray-300">Contamos con las mejores opciones para cubrir tus necesidades industriales.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4 max-w-lg group">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/70 transition-colors duration-200">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Asesoría personalizada</h3>
                      <p className="text-gray-600 dark:text-gray-300">Nuestros expertos te guiarán en cada paso del proceso.</p>
                    </div>
                  </div>
                </div>


              </div>
            </div> </div>
        </div>
      </section>

      {/* Sección de Asesores */}
      <section className="relative py-16 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800/50 transition-colors duration-300">
        {/* Background pattern - only visible in dark mode */}
        <div className="absolute inset-0 hidden dark:block">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-900/70 [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400 tracking-wider">EQUIPO</span>
            <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Nuestros Asesores
            </h2>
            <div className="mt-4 max-w-2xl mx-auto">
              <p className="text-gray-500 dark:text-gray-300">
                Expertos en bienes raíces industriales dedicados a encontrar la mejor solución para tus necesidades.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
        {/* Background pattern - only visible in dark mode */}
        <div className="absolute inset-0 hidden dark:block">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/80 to-gray-900/90 [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-blue-600 dark:text-blue-400 text-sm font-medium mb-4 tracking-wider">TESTIMONIOS</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Historias de éxito de nuestros clientes
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Descubre cómo hemos ayudado a empresas como la tuya a encontrar la propiedad industrial perfecta para sus operaciones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                clientImage={testimonial.clientImage}
                propertyImage={testimonial.propertyImage}
                name={testimonial.clientName}
                role={testimonial.role}
                comment={testimonial.comment}
                rating={testimonial.rating}
              />
            ))}
          </div>


        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">¿Listo para encontrar tu próxima propiedad industrial?</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Nuestros expertos están listos para ayudarte a encontrar la propiedad perfecta para tu negocio.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/#contacto"
              onClick={(e) => handleNavigation(e, '/#contacto')}
              className="inline-flex items-center justify-center"
            >
              <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-6 text-base font-medium">
                Contáctanos ahora
              </Button>
            </a>
            <a
              href="/#propiedades"
              onClick={(e) => handleNavigation(e, '/#propiedades')}
              className="inline-flex items-center justify-center"
            >
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-base font-medium">
                Ver propiedades
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
