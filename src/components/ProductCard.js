import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import PropTypes from "prop-types";

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
  };

  return (
    <Link to={`/products/${product.id}`} className="block h-full">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="relative h-64">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-4"
          />
          <div className="absolute top-2 right-2">
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
              title="Thêm vào giỏ"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors duration-300 line-clamp-1">
            {product.title}
          </h3>
          <p
            className="text-gray-600 mb-4 line-clamp-2 flex-grow"
            title={product.description}
          >
            {product.description}
          </p>
          <div className="flex justify-between items-center">
            <span className="text-xl font-bold text-blue-600">
              {product.price.toLocaleString("vi-VN")}đ
            </span>
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300"
            >
              Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
