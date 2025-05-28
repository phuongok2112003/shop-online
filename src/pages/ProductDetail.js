import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Mock data - replace with actual data from your backend
  const product = {
    id: parseInt(id),
    name: 'Sản phẩm ' + id,
    price: 500000,
    images: [
      'https://via.placeholder.com/800x600',
      'https://via.placeholder.com/800x600',
      'https://via.placeholder.com/800x600',
      'https://via.placeholder.com/800x600'
    ],
    description: 'Mô tả chi tiết về sản phẩm. Đây là một sản phẩm chất lượng cao với nhiều tính năng hữu ích. Sản phẩm được thiết kế với công nghệ tiên tiến, đảm bảo độ bền và hiệu suất tốt.',
    specifications: [
      { label: 'Thương hiệu', value: 'Brand Name' },
      { label: 'Xuất xứ', value: 'Việt Nam' },
      { label: 'Bảo hành', value: '12 tháng' },
      { label: 'Kích thước', value: '10 x 20 x 30 cm' },
      { label: 'Trọng lượng', value: '500g' }
    ],
    stock: 10
  };

  // Mock related products
  const relatedProducts = [
    {
      id: 1,
      name: 'Sản phẩm liên quan 1',
      price: 450000,
      image: 'https://via.placeholder.com/300x200',
      description: 'Mô tả ngắn về sản phẩm...'
    },
    {
      id: 2,
      name: 'Sản phẩm liên quan 2',
      price: 550000,
      image: 'https://via.placeholder.com/300x200',
      description: 'Mô tả ngắn về sản phẩm...'
    },
    {
      id: 3,
      name: 'Sản phẩm liên quan 3',
      price: 650000,
      image: 'https://via.placeholder.com/300x200',
      description: 'Mô tả ngắn về sản phẩm...'
    }
  ];

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    navigate('/cart');
  };

  return (
    <div className="pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-8">
          <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigate('/')}>Trang chủ</span>
          <span className="mx-2">/</span>
          <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigate('/products')}>Sản phẩm</span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Image Gallery */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg mb-4"
              />
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`border-2 rounded-lg overflow-hidden ${
                      selectedImage === index ? 'border-blue-600' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="text-2xl font-bold text-blue-600 mb-4">
              {product.price.toLocaleString('vi-VN')}đ
            </div>
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Số lượng</label>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-3 py-1 border rounded-l hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="w-16 text-center border-t border-b py-1"
                />
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-3 py-1 border rounded-r hover:bg-gray-100"
                >
                  +
                </button>
                <span className="ml-4 text-sm text-gray-500">
                  Còn {product.stock} sản phẩm
                </span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 mb-6"
            >
              Thêm vào giỏ hàng
            </button>

            {/* Specifications */}
            <div className="border-t pt-6">
              <h2 className="text-xl font-bold mb-4">Thông số kỹ thuật</h2>
              <div className="space-y-2">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="flex">
                    <span className="w-1/3 text-gray-600">{spec.label}:</span>
                    <span className="w-2/3">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail; 