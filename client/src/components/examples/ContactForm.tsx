import ContactForm from '../ContactForm';

export default function ContactFormExample() {
  return (
    <div className="p-4 max-w-md">
      <ContactForm
        propertyRef="nave-123"
        onSubmit={(data) => console.log('Contact form submitted:', data)}
      />
    </div>
  );
}
