import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import productService from "../../services/productService";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    averagePrice: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const products = await productService.getAll();
      const categories = new Set(products.map((p) => p.category));
      const totalPrice = products.reduce((sum, p) => sum + p.price, 0);

      setStats({
        totalProducts: products.length,
        totalCategories: categories.size,
        averagePrice: Math.round(totalPrice / products.length),
      });
    } catch (error) {
      console.error("Không thể tải thống kê:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Bảng điều khiển</h1>

      {/* Thống kê tổng quan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">
            Tổng số sản phẩm
          </h3>
          <p className="text-3xl font-bold text-gray-900">
            {stats.totalProducts}
          </p>
          <Link
            to="/admin/products"
            className="text-blue-500 hover:text-blue-700 text-sm mt-2 inline-block"
          >
            Xem chi tiết →
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Số danh mục</h3>
          <p className="text-3xl font-bold text-gray-900">
            {stats.totalCategories}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Giá trung bình</h3>
          <p className="text-3xl font-bold text-gray-900">
            {stats.averagePrice.toLocaleString("vi-VN")}đ
          </p>
        </div>
      </div>

      {/* Các chức năng quản lý */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link
          to="/admin/products"
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-500">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                Quản lý sản phẩm
              </h3>
              <p className="text-sm text-gray-500">
                Thêm, sửa, xóa và quản lý sản phẩm
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/admin/products/add"
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-500">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                Thêm sản phẩm mới
              </h3>
              <p className="text-sm text-gray-500">
                Thêm sản phẩm mới vào hệ thống
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/admin/categories"
          className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-500">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                Quản lý danh mục
              </h3>
              <p className="text-sm text-gray-500">
                Quản lý các danh mục sản phẩm
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
