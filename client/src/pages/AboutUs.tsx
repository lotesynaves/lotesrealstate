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

      {/* Sección Quiénes Somos */}
      <section className="relative py-16 bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 hidden dark:block">
          <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg">Nuestra Empresa</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
              Líderes en Bienes Raíces Industriales
            </h2>
          </div>

          <div className="bg-white dark:bg-gray-800/70 dark:backdrop-blur-sm dark:rounded-2xl dark:shadow-2xl dark:border dark:border-gray-700/50 p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  En Naves y Lotes Industriales, apoyamos el crecimiento de empresas nacionales y extranjeras mediante soluciones inmobiliarias industriales y comerciales que responden a las exigencias del mercado global.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Nuestra visión es contribuir al desarrollo económico y comunitario de México, generando empleos, conocimiento y relaciones de largo plazo que impulsan la competitividad y crean ecosistemas empresariales sólidos en Querétaro, el corazón industrial del Bajío.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  Estamos presentes en los principales centros industriales de Querétaro, lo que nos permite posicionar a cada cliente dentro de los mejores corredores logísticos y zonas estratégicas del país.
                </p>
              </div>

              <div className="relative h-80 md:h-96 rounded-xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                  alt="Nuestro Equipo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Soluciones */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Nuestras Soluciones
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Soluciones inmobiliarias estratégicas para el crecimiento de su negocio
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Naves de Inventario</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Naves de inventario (shell buildings) disponibles para ocupación inmediata, construidas con altos estándares y ubicadas en regiones clave de Querétaro.
              </p>
              <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Disponibilidad inmediata</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Ubicaciones estratégicas</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Altos estándares de construcción</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-xl">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Proyectos a Medida</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Proyectos "build-to-suit" totalmente personalizados según los requerimientos operativos y financieros de su empresa.
              </p>
              <ul className="mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Diseño personalizado</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Proceso integral</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Adaptado a sus necesidades</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Misión, Visión y Valores */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-blue-600 dark:text-blue-400 text-sm font-medium tracking-wider">NUESTROS PRINCIPIOS</span>
            <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Misión, Visión y Valores
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Misión */}
            <div className="bg-white dark:bg-gray-800/70 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Misión</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Promover la competitividad de México y Querétaro ofreciendo a empresas extranjeras el entorno y las soluciones inmobiliarias ideales para su éxito.
              </p>
            </div>

            {/* Visión */}
            <div className="bg-white dark:bg-gray-800/70 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Visión</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Ser la puerta de entrada preferida por corporativos internacionales para sus operaciones industriales y comerciales en México, contribuyendo al desarrollo económico de la región.
              </p>
            </div>

            {/* Valores */}
            <div className="bg-white dark:bg-gray-800/70 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700/50">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Valores</h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Transparencia en todas nuestras operaciones</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Innovación en soluciones inmobiliarias</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Compromiso con el éxito de nuestros clientes</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Profesionalismo en cada interacción</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Experiencia internacional al servicio local</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Testimonios */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-blue-600 dark:text-blue-400 text-sm font-medium tracking-wider">TESTIMONIOS</span>
            <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
              Lo que dicen nuestros clientes
            </h2>
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

      {/* Sección de Asesores */}
      <section className="relative py-16 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800/50 transition-colors duration-300">
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
      < section className="relative py-20 bg-white dark:bg-gray-800 transition-colors duration-300" >
        {/* Background pattern - only visible in dark mode */}
        < div className="absolute inset-0 hidden dark:block" >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/80 to-gray-900/90 [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]"></div>
        </div >

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
      </section >

      {/* CTA Section */}
      < section className="bg-gradient-to-r from-blue-700 to-blue-800 text-white py-16" >
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
      </section >
    </div >
  );
}
