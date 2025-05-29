import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getOrders } from "../services/orderApi";

function Orders() {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Nếu AuthContext đang load hoặc không có user, không fetch orders
    if (authLoading || !user) {
      return;
    }

    const fetchOrders = async () => {
      try {
        const data = await getOrders(user.id);
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError("Không thể tải danh sách đơn hàng.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, authLoading]);

  // Hiển thị loading khi AuthContext đang load hoặc khi đang fetch orders
  if (authLoading || loading) {
    return (
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  // Nếu chưa đăng nhập (ProtectedRoute sẽ xử lý redirect) hoặc có lỗi
  if (!user || error) {
    return (
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-red-600">
            <p>{error || "Bạn cần đăng nhập để xem đơn hàng."}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Đơn hàng của tôi</h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>Bạn chưa có đơn hàng nào.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-center mb-4 border-b pb-4">
                  <h2 className="text-xl font-bold">Đơn hàng #{order.id}</h2>
                  <span
                    className={`text-sm font-semibold ${
                      order.status === "Đã giao hàng"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="mb-4">
                  <p className="text-gray-600 text-sm mb-2">
                    Ngày đặt: {order.date}
                  </p>
                  <p className="text-gray-600 text-sm">
                    Tổng tiền: {order.total.toLocaleString("vi-VN")}đ
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2">Sản phẩm:</h3>
                  <ul className="space-y-2">
                    {order.items.map((item) => (
                      <li key={item.id} className="text-gray-700 text-sm">
                        {item.title} x {item.quantity} -{" "}
                        {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
