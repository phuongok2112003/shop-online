import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Về chúng tôi</h3>
            <p className="text-gray-400">ShopOnline - Nơi mua sắm trực tuyến đáng tin cậy với đa dạng sản phẩm chất lượng.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Liên hệ</h3>
            <p className="text-gray-400">Email: contact@shoponline.com</p>
            <p className="text-gray-400">Điện thoại: 0123 456 789</p>
            <p className="text-gray-400">Địa chỉ: 61/296 Lĩnh Nam, Hoàng Mai, Hà NộiNội </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Theo dõi chúng tôi</h3>
            <div className="flex space-x-4">
              <a href="https://facebook.com/shoponline" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Facebook</a>
              <a href="https://instagram.com/shoponline" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Instagram</a>
              <a href="https://twitter.com/shoponline" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Twitter</a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 ShopOnline. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 