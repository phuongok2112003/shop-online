import React from 'react';
import { Link } from 'react-router-dom';
function HeroSection() {
  return (
    <div className="bg-blue-600 text-white">
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Chào mừng đến với ShopOnline
        </h1>
        <p className="text-xl mb-8">
          Khám phá bộ sưu tập sản phẩm chất lượng cao với giá cả phải chăng
        </p>
        <Link
          to="/products"
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
        >
          Mua sắm ngay
        </Link>
      </div>
    </div>
  </div>
  );
}

export default HeroSection; 