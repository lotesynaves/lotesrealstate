import React from 'react';

interface TestimonialCardProps {
  clientImage: string;
  propertyImage: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  clientImage,
  propertyImage,
  name,
  role,
  comment,
  rating,
}) => {
  // Render stars based on rating (1-5)
  const renderStars = () => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <svg
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ));
  };

  return (
    <div className="group bg-white dark:bg-gray-800/70 dark:backdrop-blur-sm rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-gray-700/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-gray-200 dark:hover:border-gray-600">
      {/* Property Image */}
      <div className="h-48 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent z-10 dark:from-black/60 dark:via-black/30"></div>
        <img
          src={propertyImage}
          alt={`Propiedad de ${name}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute bottom-4 left-4 z-20">
          <div className="flex items-center bg-black/30 dark:bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
            {renderStars()}
            <span className="ml-2 text-sm font-medium text-white">{rating}.0</span>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Client Info */}
        <div className="flex items-center mb-5">
          <div className="relative h-14 w-14 flex-shrink-0 mr-4">
            <img
              src={clientImage}
              alt={name}
              className="h-full w-full rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-md"
              loading="lazy"
            />
            <div className="absolute -bottom-1 -right-1 bg-blue-600 dark:bg-blue-500 rounded-full p-1.5 shadow-sm">
              <svg
                className="w-3.5 h-3.5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10v-4a1 1 0 01.293-.707l3-3A1 1 0 0115 7h5.379a2 2 0 011.414-.586l2.621-2.621A1 1 0 0124 3v10a1 1 0 01-1 1h-1.05a2.5 2.5 0 00-4.9 0H14v4a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1z" />
              </svg>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">{role}</p>
          </div>
        </div>

        {/* Comment */}
        <blockquote className="relative pl-4 border-l-2 border-blue-100 dark:border-blue-900/50">
          <svg 
            className="absolute -left-3 top-0 w-6 h-6 text-blue-100 dark:text-blue-900/50" 
            fill="currentColor" 
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="text-gray-600 dark:text-gray-300 italic pl-4">
            {comment}
          </p>
        </blockquote>
      </div>
    </div>
  );
};
