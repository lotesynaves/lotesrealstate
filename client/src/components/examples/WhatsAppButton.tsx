import WhatsAppButton from '../WhatsAppButton';

export default function WhatsAppButtonExample() {
  return (
    <div className="p-4">
      <WhatsAppButton
        phoneNumber="5214421234567"
        message="Hola, me interesa: Nave Industrial - https://example.com/property/123"
      />
    </div>
  );
}
