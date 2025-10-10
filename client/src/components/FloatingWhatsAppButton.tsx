import { MessageCircle } from "lucide-react";

interface FloatingWhatsAppButtonProps {
  phoneNumber: string;
  message?: string;
  className?: string;
}

export default function FloatingWhatsAppButton({
  phoneNumber = "1234567890", // Replace with your default phone number
  message = "Hola, me gustaría obtener más información sobre una propiedad",
  className = "",
}: FloatingWhatsAppButtonProps) {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-8 right-8 bg-[#25D366] hover:bg-[#20BA5A] text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50 ${className}`}
      aria-label="Chatea con nosotros por WhatsApp"
      data-testid="floating-whatsapp-button"
    >
      <MessageCircle className="h-8 w-8" />
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
        1
      </span>
    </button>
  );
}
