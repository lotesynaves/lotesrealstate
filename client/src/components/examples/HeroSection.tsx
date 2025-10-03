import HeroSection from '../HeroSection';

export default function HeroSectionExample() {
  return (
    <HeroSection
      onPlayVideo={() => console.log('Play video clicked')}
      onSearch={(params) => console.log('Search params:', params)}
    />
  );
}
