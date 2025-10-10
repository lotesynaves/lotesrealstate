import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, Phone, MessageCircle, MapPin, Mail } from "lucide-react";

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

const WHATSAPP_NUMBER = "+5214427127039"; // Replace with your actual WhatsApp number

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
    
    // Format the message for WhatsApp
    let message = `*Nuevo mensaje de contacto*\n\n`;
    message += `*Nombre:* ${formData.name}\n`;
    message += `*Teléfono:* ${formData.phone}\n`;
    message += `*Email:* ${formData.email}\n`;
    if (formData.propertyRef) {
      message += `*Propiedad de interés:* ${formData.propertyRef}\n\n`;
    }
    message += `*Mensaje:* ${formData.message}`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Open WhatsApp with the pre-filled message
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
    
    // Call the onSubmit callback if provided
    onSubmit?.(formData);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
          ¿Tienes una propiedad en venta o renta?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Déjanos tus datos y un asesor se pondrá en contacto contigo a la brevedad
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="flex items-start space-x-5 group">
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors duration-200">
              <Phone className="h-6 w-6 text-gray-700 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-200" />
            </div>
            <div>
              <h3 className="font-medium text-lg text-gray-900 dark:text-gray-100">Llámanos</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">+52 442 712 7039</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-5 group">
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg group-hover:bg-green-50 dark:group-hover:bg-green-900/20 transition-colors duration-200">
              <MessageCircle className="h-6 w-6 text-gray-700 dark:text-green-400 group-hover:text-green-600 dark:group-hover:text-green-300 transition-colors duration-200" />
            </div>
            <div>
              <h3 className="font-medium text-lg text-gray-900 dark:text-gray-100">WhatsApp</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">+52 442 712 7039</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-5 group">
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg group-hover:bg-red-50 dark:group-hover:bg-red-900/20 transition-colors duration-200">
              <Mail className="h-6 w-6 text-gray-700 dark:text-red-400 group-hover:text-red-600 dark:group-hover:text-red-300 transition-colors duration-200" />
            </div>
            <div>
              <h3 className="font-medium text-lg text-gray-900 dark:text-gray-100">Correo</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">contacto@industrialrealtyhub.com</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-5 group">
            <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20 transition-colors duration-200">
              <MapPin className="h-6 w-6 text-gray-700 dark:text-purple-400 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors duration-200" />
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-300 mt-1">Av. Ejemplo #123, Col. Centro, CDMX</p>
            </div>
          </div>
        </div>
        
        <form 
          onSubmit={handleSubmit} 
          className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200" 
          data-testid="form-contact"
        >
          <div>
            <Label htmlFor="name" className="text-gray-700 dark:text-gray-200 font-medium">Nombre completo</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Juan Pérez"
              required
              className="mt-2 h-12 px-4 border-gray-300 dark:border-gray-600 
                focus:border-blue-500 dark:focus:border-blue-400 
                focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                transition-colors duration-200"
              data-testid="input-name"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="phone" className="text-gray-700 dark:text-gray-200 font-medium">Teléfono</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="442 712 7039"
                required
                className="mt-2 h-12 px-4 border-gray-300 dark:border-gray-600 
                  focus:border-blue-500 dark:focus:border-blue-400 
                  focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                  transition-colors duration-200"
                data-testid="input-phone"
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-200 font-medium">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="juan@ejemplo.com"
                required
                className="mt-2 h-12 px-4 border-gray-300 dark:border-gray-600 
                  focus:border-blue-500 dark:focus:border-blue-400 
                  focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                  transition-colors duration-200"
                data-testid="input-email"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="message" className="text-gray-700 dark:text-gray-200 font-medium">Mensaje</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Cuéntanos sobre tu propiedad..."
              rows={4}
              required
              className="mt-2 px-4 py-3 border-gray-300 dark:border-gray-600 
                focus:border-blue-500 dark:focus:border-blue-400 
                focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                transition-colors duration-200"
              data-testid="input-message"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-12 bg-gray-900 hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-700 
              text-white font-medium text-base transition-colors duration-200" 
            data-testid="submit-button"
          >
            <Send className="mr-2 h-5 w-5" /> Enviar mensaje por WhatsApp
          </Button>
        </form>
        
        <div className="mt-10 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Al enviar este formulario, aceptas nuestra{' '}
            <a 
              href="/politica-privacidad" 
              className="text-gray-700 dark:text-blue-400 font-medium hover:text-gray-900 dark:hover:text-blue-300 hover:underline transition-colors"
            >
              Política de Privacidad
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
