import React from 'react';

function HeroSection() {
  return (
    <section className="bg-blue-600 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-4">Chào mừng đến với ShopOnline</h2>
        <p className="text-xl mb-8">Khám phá ngay những sản phẩm chất lượng với giá tốt nhất</p>
        <span className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100">
          Mua sắm ngay
        </span>
      </div>
    </section>
  );
}

export default HeroSection; 