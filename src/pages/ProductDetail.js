import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, getProducts } from "../services/api";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(id);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError("Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };

    const fetchRelatedProducts = async () => {
      try {
        const products = await getProducts();
        // Lấy 3 sản phẩm ngẫu nhiên khác làm sản phẩm liên quan
        const filteredProducts = products.filter((p) => p.id !== parseInt(id));
        const randomProducts = filteredProducts
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);
        setRelatedProducts(randomProducts);
      } catch (err) {
        console.error("Error fetching related products:", err);
      }
    };

    fetchProduct();
    fetchRelatedProducts();
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
        <div>
          <h2 className="text-2xl font-bold mb-6">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
