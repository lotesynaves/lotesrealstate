import { MessageCircle } from "lucide-react";

interface FloatingWhatsAppButtonProps {
  className?: string;
}

export default function FloatingWhatsAppButton({
  className = "",
}: FloatingWhatsAppButtonProps) {
  const handleClick = () => {
    const phoneNumber = '524425922245'; // WhatsApp number with country code (Mexico)
    const message = encodeURIComponent('¡Hola! Me gustaría obtener más información sobre sus propiedades.');
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-8 right-8 bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50 ${className}`}
      aria-label="Contáctanos"
      data-testid="floating-contact-button"
    >
      <MessageCircle className="h-8 w-8" />
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
        !
      </span>
    </button>
  );
}
