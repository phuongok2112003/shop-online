import React from 'react';
import HeroSection from '../components/HeroSection';
import FeaturedProducts from '../components/FeaturedProducts';

function Home() {
  return (
    <div className="pt-16">
      <HeroSection />
      <FeaturedProducts />
    </div>
  );
}

export default Home; 