import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Header() {
  const { cartItems, getCartItemsCount, removeFromCart } = useCart();

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-blue-600">ShopOnline</Link>
          
          <nav className="flex items-center space-x-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600">Trang chủ</Link>
            <Link to="/products" className="text-gray-600 hover:text-blue-600">Sản phẩm</Link>
            
            {/* Cart Dropdown */}
            <div className="relative group">
              <Link to="/cart" className="flex items-center text-gray-600 hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {getCartItemsCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getCartItemsCount()}
                  </span>
                )}
              </Link>
              
              {/* Cart Dropdown Content */}
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-4">Giỏ hàng</h3>
                  {cartItems.length === 0 ? (
                    <p className="text-gray-500">Giỏ hàng trống</p>
                  ) : (
                    <>
                      <div className="max-h-60 overflow-y-auto">
                        {cartItems.map(item => (
                          <div key={item.id} className="flex items-center py-2 border-b last:border-b-0">
                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                            <div className="ml-3 flex-1">
                              <h4 className="text-sm font-medium">{item.name}</h4>
                              <p className="text-sm text-gray-600">
                                {item.quantity} x {item.price.toLocaleString('vi-VN')}đ
                              </p>
                            </div>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t">
                        <Link
                          to="/cart"
                          className="block w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700"
                        >
                          Xem giỏ hàng
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <Link to="/contact" className="text-gray-600 hover:text-blue-600">Liên hệ</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header; 