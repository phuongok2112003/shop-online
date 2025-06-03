import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, getProducts } from "~/services/api";
import { useCart } from "~/context/CartContext";
import ProductCard from "~/components/ProductCard";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Hàm xử lý cuộn sản phẩm liên quan
  const scrollRelatedProducts = useCallback((direction) => {
    const container = document.getElementById("related-products-container");
    const scrollAmount = 300; // Số pixel cuộn mỗi lần
    if (container) {
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        console.log("data ", data.category);
        setProduct(data);
        setLoading(false);
        return data; // Return the product data
      } catch (err) {
        setError("Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.");
        setLoading(false);
        return null;
      }
    };

    const fetchRelatedProducts = async (productData) => {
      if (!productData) return;

      try {
        const products = await getProducts();
        // Lấy sản phẩm cùng danh mục
        const filteredProducts = products.filter(
          (p) => p.id !== parseInt(id) && p.category === productData.category
        );

        const relatedProducts = filteredProducts.slice(0, 10);
        setRelatedProducts(relatedProducts);
      } catch (err) {
        console.error("Error fetching related products:", err);
      }
    };

    const initializeData = async () => {
      const productData = await fetchProduct();
      if (productData) {
        await fetchRelatedProducts(productData);
      }
    };

    initializeData();
  }, [id]);

  const handleQuantityChange = (value) => {
    const newQuantity = quantity + value;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart({ ...product, quantity });
      navigate("/cart");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p>{error || "Không tìm thấy sản phẩm"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-8">
          <span
            className="hover:text-blue-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            Trang chủ
          </span>
          <span className="mx-2">/</span>
          <span
            className="hover:text-blue-600 cursor-pointer"
            onClick={() => navigate("/products")}
          >
            Sản phẩm
          </span>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{product.title}</span>
        </div>

        {/* Chi tiết sản phẩm */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Thư viện hình ảnh */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-96 object-contain rounded-lg mb-4"
              />
            </div>
          </div>

          {/* Thông tin sản phẩm */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
            <div className="text-2xl font-bold text-blue-600 mb-4">
              {product.price.toLocaleString("vi-VN")}đ
            </div>
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Lựa chọn số lượng */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số lượng
              </label>
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
              </div>
            </div>

            {/* Nút Thêm vào giỏ hàng */}
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 mb-6"
            >
              Thêm vào giỏ hàng
            </button>

            {/* Thông tin sản phẩm */}
            <div className="border-t pt-6">
              <h2 className="text-xl font-bold mb-4">Thông tin sản phẩm</h2>
              <div className="space-y-2">
                <div className="flex">
                  <span className="w-1/3 text-gray-600">Danh mục:</span>
                  <span className="w-2/3 capitalize">{product.category}</span>
                </div>
                <div className="flex">
                  <span className="w-1/3 text-gray-600">Đánh giá:</span>
                  <span className="w-2/3">
                    {product.rating.rate} ({product.rating.count} đánh giá)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sản phẩm liên quan */}
        <div className="relative">
          <h2 className="text-2xl font-bold mb-6">Sản phẩm liên quan</h2>

          {/* Nút điều hướng trái */}
          <button
            onClick={() => scrollRelatedProducts("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
            style={{ marginLeft: "-1rem" }}
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Container cuộn ngang */}
          <div
            id="related-products-container"
            className="flex overflow-x-auto gap-6 pb-4 px-4 scrollbar-hide"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              scrollBehavior: "smooth",
              WebkitOverflowScrolling: "touch",
            }}
          >
            {relatedProducts.map((product) => (
              <div
                key={product.id}
                className="flex-none"
                style={{ width: "300px" }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Nút điều hướng phải */}
          <button
            onClick={() => scrollRelatedProducts("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg"
            style={{ marginRight: "-1rem" }}
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
