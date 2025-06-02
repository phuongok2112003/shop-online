import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/api";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Lấy danh sách danh mục từ sản phẩm
  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (err) {
        setError("Không thể tải danh sách sản phẩm. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Xử lý lọc sản phẩm khi danh mục hoặc từ khóa tìm kiếm thay đổi
  useEffect(() => {
    let result = products;

    // Lọc theo danh mục
    if (selectedCategory !== "all") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Lọc theo từ khóa tìm kiếm
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(result);
  }, [selectedCategory, searchQuery, products]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Tất cả sản phẩm</h1>

        {/* Phần tìm kiếm và lọc */}
        <div className="mb-8 space-y-4">
          {/* Thanh tìm kiếm */}
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
          </div>

          {/* Bộ lọc danh mục */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                  ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {category === "all" ? "Tất cả" : category}
              </button>
            ))}
          </div>

          {/* Hiển thị số lượng sản phẩm đã lọc */}
          <p className="text-gray-600">
            Đã tìm thấy {filteredProducts.length} sản phẩm
          </p>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Thông báo khi không tìm thấy sản phẩm */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">Không tìm thấy sản phẩm phù hợp</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
