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

const WHATSAPP_NUMBER = "+524425922245"; // WhatsApp number for contact

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
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-3">
          ¿Tienes una propiedad en venta o renta?
        </h2>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-2">
          Déjanos tus datos y un asesor se pondrá en contacto contigo a la brevedad
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
        <div className="space-y-6 sm:space-y-8">
          <div className="flex items-start space-x-4 group">
            <div className="flex-shrink-0 bg-gray-100 dark:bg-gray-800 p-2.5 sm:p-3 rounded-lg group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors duration-200">
              <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-200" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-base sm:text-lg text-gray-900 dark:text-gray-100">Llámanos</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-0.5">442 592 2245</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 group">
            <div className="flex-shrink-0 bg-gray-100 dark:bg-gray-800 p-2.5 sm:p-3 rounded-lg group-hover:bg-green-50 dark:group-hover:bg-green-900/20 transition-colors duration-200">
              <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 dark:text-green-400 group-hover:text-green-600 dark:group-hover:text-green-300 transition-colors duration-200" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-base sm:text-lg text-gray-900 dark:text-gray-100">WhatsApp</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-0.5">442 592 2245</p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 group">
            <div className="flex-shrink-0 bg-gray-100 dark:bg-gray-800 p-2.5 sm:p-3 rounded-lg group-hover:bg-red-50 dark:group-hover:bg-red-900/20 transition-colors duration-200">
              <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 dark:text-red-400 group-hover:text-red-600 dark:group-hover:text-red-300 transition-colors duration-200" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-base sm:text-lg text-gray-900 dark:text-gray-100">Correo</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-0.5 break-words">
                propiedades@navesylotesindustriales.com
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4 group">
            <div className="flex-shrink-0 bg-gray-100 dark:bg-gray-800 p-2.5 sm:p-3 rounded-lg group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20 transition-colors duration-200">
              <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700 dark:text-purple-400 group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors duration-200" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-base sm:text-lg text-gray-900 dark:text-gray-100 mb-0.5">Dirección</h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Sierra de Zimapán 4, Villas del Sol, 76046 Santiago de Querétaro, Qro.
              </p>
            </div>
          </div>
        </div>
        
        <form 
          onSubmit={handleSubmit} 
          className="space-y-4 sm:space-y-6 bg-white dark:bg-gray-800 p-4 sm:p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-200" 
          data-testid="form-contact"
        >
          <div>
            <Label htmlFor="name" className="text-sm sm:text-base text-gray-700 dark:text-gray-200 font-medium">
              Nombre completo
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Juan Pérez"
              required
              className="mt-1.5 h-11 sm:h-12 px-4 text-sm sm:text-base border-gray-300 dark:border-gray-600 
                focus:border-blue-500 dark:focus:border-blue-400 
                focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                transition-colors duration-200"
              data-testid="input-name"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <Label htmlFor="phone" className="text-sm sm:text-base text-gray-700 dark:text-gray-200 font-medium">
                Teléfono
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="442 712 7039"
                required
                className="mt-1.5 h-11 sm:h-12 px-4 text-sm sm:text-base border-gray-300 dark:border-gray-600 
                  focus:border-blue-500 dark:focus:border-blue-400 
                  focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                  transition-colors duration-200"
                data-testid="input-phone"
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="text-sm sm:text-base text-gray-700 dark:text-gray-200 font-medium">
                Correo electrónico
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="tucorreo@ejemplo.com"
                required
                className="mt-1.5 h-11 sm:h-12 px-4 text-sm sm:text-base border-gray-300 dark:border-gray-600 
                  focus:border-blue-500 dark:focus:border-blue-400 
                  focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400
                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                  transition-colors duration-200"
                data-testid="input-email"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="message" className="text-sm sm:text-base text-gray-700 dark:text-gray-200 font-medium">
              Mensaje
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Cuéntanos sobre tu propiedad o en qué podemos ayudarte..."
              rows={4}
              required
              className="mt-1.5 px-4 py-3 text-sm sm:text-base border-gray-300 dark:border-gray-600 
                focus:border-blue-500 dark:focus:border-blue-400 
                focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-400
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                transition-colors duration-200 resize-none"
              data-testid="input-message"
            />
          </div>
          
          <div className="pt-1">
            <Button 
              type="submit" 
              className="w-full h-11 sm:h-12 text-sm sm:text-base font-medium bg-blue-600 hover:bg-blue-700 text-white 
                transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              data-testid="submit-button"
            >
              <Send className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Enviar mensaje
            </Button>
          </div>
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
