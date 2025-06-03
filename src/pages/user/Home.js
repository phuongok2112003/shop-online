import React from "react";
import FeaturedProducts from "~/components/FeaturedProducts";
import HeroSection from "~/components/HeroSection";
import FeaturesSection from "~/components/FeaturesSection";

function Home() {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <HeroSection />
      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Features Section */}
      <FeaturesSection />
    </div>
  );
}

export default Home;
