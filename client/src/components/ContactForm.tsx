import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";

interface ContactFormProps {
  propertyRef?: string;
  onSubmit?: (data: ContactFormData) => void;
}

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyRef?: string;
}

export default function ContactForm({ propertyRef, onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
    propertyRef,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onSubmit?.(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" data-testid="form-contact">
      <div>
        <Label htmlFor="name">Nombre completo</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Juan Pérez"
          required
          data-testid="input-name"
        />
      </div>
      <div>
        <Label htmlFor="email">Correo electrónico</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="juan@ejemplo.com"
          required
          data-testid="input-email"
        />
      </div>
      <div>
        <Label htmlFor="phone">Teléfono</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="+52 442 123 4567"
          required
          data-testid="input-phone"
        />
      </div>
      <div>
        <Label htmlFor="message">Mensaje</Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Cuéntanos sobre tu necesidad..."
          className="min-h-32"
          required
          data-testid="input-message"
        />
      </div>
      <Button type="submit" className="w-full gap-2" size="lg" data-testid="button-submit-contact">
        <Send className="h-4 w-4" />
        Enviar Mensaje
      </Button>
    </form>
  );
}
