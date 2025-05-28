import React from 'react';
import ProductCard from './ProductCard';

function FeaturedProducts() {
  // Mock data - replace with actual data from your backend
  const featuredProducts = [
    {
      id: 1,
      name: 'Sản phẩm 1',
      price: 500000,
      image: 'https://via.placeholder.com/300x200',
      description: 'Mô tả ngắn về sản phẩm...'
    },
    {
      id: 2,
      name: 'Sản phẩm 2',
      price: 750000,
      image: 'https://via.placeholder.com/300x200',
      description: 'Mô tả ngắn về sản phẩm...'
    },
    {
      id: 3,
      name: 'Sản phẩm 3',
      price: 1000000,
      image: 'https://via.placeholder.com/300x200',
      description: 'Mô tả ngắn về sản phẩm...'
    },
    {
      id: 4,
      name: 'Sản phẩm 4',
      price: 500000,
      image: 'https://via.placeholder.com/300x200',
      description: 'Mô tả ngắn về sản phẩm...'
    },
    {
      id: 5,
      name: 'Sản phẩm 5',
      price: 750000,
      image: 'https://via.placeholder.com/300x200',
      description: 'Mô tả ngắn về sản phẩm...'
    },
    {
      id: 6,
      name: 'Sản phẩm 6',
      price: 1000000,
      image: 'https://via.placeholder.com/300x200',
      description: 'Mô tả ngắn về sản phẩm...'
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Sản phẩm nổi bật</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts; 