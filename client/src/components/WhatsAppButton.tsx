import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

interface WhatsAppButtonProps {
  phoneNumber: string;
  message: string;
  className?: string;
  variant?: "default" | "outline";
}

export default function WhatsAppButton({
  phoneNumber,
  message,
  className = "",
  variant = "default",
}: WhatsAppButtonProps) {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Button
      onClick={handleClick}
      className={`gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white ${className}`}
      variant={variant}
      data-testid="button-whatsapp"
    >
      <MessageCircle className="h-5 w-5" />
      Contactar por WhatsApp
    </Button>
  );
}
