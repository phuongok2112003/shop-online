import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, getProducts } from "~/services/api";
import { useCart } from "~/context/CartContext";
import ProductCard from "~/components/ProductCard";
import { StarIcon } from "@heroicons/react/24/solid";

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
    const scrollAmount = 300;
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
        const data = await getProductById(parseInt(id));
        setProduct(data);
        setLoading(false);
        return data;
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
        const filteredProducts = products.filter(
          (p) => p.id !== parseInt(id) && p.category === productData.category
        );
        setRelatedProducts(filteredProducts.slice(0, 10));
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
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (product && product.status === "active") {
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
          <span className="text-gray-900">{product.name}</span>
        </div>

        {/* Chi tiết sản phẩm */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Thư viện hình ảnh */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-contain rounded-lg mb-4"
              />
              {product.status === "active" ? (
                <span className="inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                  Còn hàng
                </span>
              ) : (
                <span className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                  Hết hàng
                </span>
              )}
            </div>
          </div>

          {/* Thông tin sản phẩm */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="text-2xl font-bold text-blue-600 mb-4">
              {product.price.toLocaleString("vi-VN")}đ
            </div>
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Đánh giá */}
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <StarIcon
                    key={index}
                    className={`h-5 w-5 ${
                      index < Math.floor(product.rating.rate)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">
                ({product.rating.count} đánh giá)
              </span>
            </div>

            {/* Lựa chọn số lượng */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Số lượng
              </label>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="px-3 py-1 border rounded-l hover:bg-gray-100"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (value >= 1 && value <= product.stock) {
                      setQuantity(value);
                    }
                  }}
                  className="w-16 text-center border-t border-b py-1"
                />
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="px-3 py-1 border rounded-r hover:bg-gray-100"
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Còn {product.stock} sản phẩm trong kho
              </p>
            </div>

            {/* Nút Thêm vào giỏ hàng */}
            <button
              onClick={handleAddToCart}
              disabled={product.status !== "active"}
              className={`w-full py-3 rounded-lg text-white font-medium ${
                product.status === "active"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {product.status === "active" ? "Thêm vào giỏ hàng" : "Hết hàng"}
            </button>

            {/* Thông tin sản phẩm */}
            <div className="border-t pt-6 mt-6">
              <h2 className="text-xl font-bold mb-4">Thông tin sản phẩm</h2>
              <div className="space-y-2">
                <div className="flex">
                  <span className="w-1/3 text-gray-600">Danh mục:</span>
                  <span className="w-2/3 capitalize">{product.category}</span>
                </div>
                <div className="flex">
                  <span className="w-1/3 text-gray-600">Tồn kho:</span>
                  <span className="w-2/3">{product.stock} sản phẩm</span>
                </div>
                <div className="flex">
                  <span className="w-1/3 text-gray-600">Trạng thái:</span>
                  <span className="w-2/3 capitalize">
                    {product.status === "active" ? "Còn hàng" : "Hết hàng"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sản phẩm liên quan */}
        {relatedProducts.length > 0 && (
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
        )}
      </div>
    </div>
  );
}

export default ProductDetail;
