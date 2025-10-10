import { Agent } from '../data/agents';

interface AgentCardProps {
  agent: Agent;
}

export const AgentCard = ({ agent }: AgentCardProps) => {
  return (
    <div className="group bg-white dark:bg-gray-800/70 dark:backdrop-blur-sm rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-gray-700/50 hover:border-gray-200 dark:hover:border-gray-600">
      <div className="relative h-72 overflow-hidden">
        <img
          src={agent.image}
          alt={agent.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 w-full">
            <h3 className="text-xl font-medium text-white mb-1">{agent.name}</h3>
            <p className="text-blue-200 text-sm">{agent.position}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {agent.specialties.slice(0, 3).map((specialty, index) => (
                <span key={index} className="text-xs bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors">
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6 text-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">{agent.name}</h3>
        <p className="text-sm text-blue-600 dark:text-blue-400 mb-3">{agent.position}</p>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-5 line-clamp-2">{agent.description}</p>
        
        <a 
          href={`https://wa.me/${agent.whatsapp}?text=Hola ${encodeURIComponent(agent.name.split(' ')[0])}, me interesa conocer más sobre sus servicios de bienes raíces industriales.`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full py-2.5 px-4 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.498 14.382v3.3c0 .66.536 1.204 1.196 1.23.28.012.562.012.843 0 2.4-.09 4.463-1.9 4.463-4.444V7.213C24 4.669 21.962 2.6 19.54 2.6h-15.08C2.04 2.6 0 4.668 0 7.213v6.154c0 2.545 2.04 4.613 4.46 4.613h1.91v3.069c0 .216.06.427.174.608.223.354.628.5 1.003.36l3.495-1.2c.496.15 1 .226 1.505.227h6.82c1.8 0 3.4-1 4.6-2.4l-1.45-1.2c-.6.6-1.3 1-2.3 1h-6.6c-.2 0-.3 0-.5.1l-1.8 1v-2.4h1.8c.2 0 .3 0 .5-.1.3-.1.5-.3.6-.5.2-.2.2-.4.2-.6v-3.5c0-.3-.1-.5-.3-.7-.1-.1-.3-.1-.5-.1h-3.4c-.3 0-.5.1-.7.3-.1.1-.1.3-.1.5v3.5c0 .3.1.5.3.7.1.1.3.1.5.1h1.8v1.9h-1.8c-.7 0-1.4-.2-2-.5l-.4-.2h-2.3c-1.2 0-2.1-1-2.1-2.2v-6.2c0-1.2 1-2.2 2.1-2.2h15.1c1.1 0 2.1 1 2.1 2.2v6.2c0 1.1-.9 2-2.1 2.2z" />
          </svg>
          Contactar por WhatsApp
        </a>
      </div>
    </div>
  );
};
