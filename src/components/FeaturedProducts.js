import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../services/api";
import { Link } from "react-router-dom";
function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const products = await getProducts();
        // Lấy 4 sản phẩm đầu tiên làm sản phẩm nổi bật
        setFeaturedProducts(products.slice(0, 8));
        setLoading(false);
      } catch (err) {
        setError("Không thể tải sản phẩm nổi bật. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Sản phẩm nổi bật
        </h2>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600">
            <p>{error}</p>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Link to="/products" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
                Xem thêm
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default FeaturedProducts;
