import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById, updateOrderStatus } from "~/services/api";

function AdminOrderDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(id);
        setOrder(data);
        setLoading(false);
      } catch (err) {
        setError("Không thể tải thông tin đơn hàng");
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    setUpdating(true);
    try {
      await updateOrderStatus(id, newStatus);
      setOrder((prev) => ({ ...prev, status: newStatus }));
    } catch (err) {
      setError("Không thể cập nhật trạng thái đơn hàng");
    } finally {
      setUpdating(false);
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

  if (error || !order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-600">
          <p>{error || "Không tìm thấy đơn hàng"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Chi tiết đơn hàng #{order.id}</h1>
          <button
            onClick={() => navigate("/admin")}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Quay lại
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Thông tin đơn hàng */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Thông tin đơn hàng</h2>
            <div className="space-y-4">
              <div>
                <span className="text-gray-600">Ngày đặt:</span>
                <span className="ml-2">
                  {new Date(order.orderDate).toLocaleDateString("vi-VN")}
                </span>
              </div>
              <div>
                <span className="text-gray-600">Tổng tiền:</span>
                <span className="ml-2 font-bold">
                  {order.total.toLocaleString("vi-VN")}đ
                </span>
              </div>
              <div>
                <span className="text-gray-600">Trạng thái:</span>
                <div className="mt-2">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    disabled={updating}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">Chờ xác nhận</option>
                    <option value="processing">Đang xử lý</option>
                    <option value="completed">Hoàn thành</option>
                    <option value="cancelled">Đã hủy</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Thông tin khách hàng */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Thông tin khách hàng</h2>
            <div className="space-y-4">
              <div>
                <span className="text-gray-600">Họ tên:</span>
                <span className="ml-2">{order.customerName}</span>
              </div>
              <div>
                <span className="text-gray-600">Email:</span>
                <span className="ml-2">{order.customerEmail}</span>
              </div>
              <div>
                <span className="text-gray-600">Số điện thoại:</span>
                <span className="ml-2">{order.customerPhone}</span>
              </div>
              <div>
                <span className="text-gray-600">Địa chỉ:</span>
                <span className="ml-2">{order.shippingAddress}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="mt-8 bg-white rounded-lg shadow overflow-hidden">
          <h2 className="text-xl font-bold p-6 border-b">Sản phẩm đã đặt</h2>
          <div className="divide-y">
            {order.items.map((item) => (
              <div key={item.id} className="p-6 flex items-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="ml-6 flex-1">
                  <h3 className="text-lg font-medium">{item.title}</h3>
                  <p className="text-gray-600">Số lượng: {item.quantity}</p>
                  <p className="text-gray-600">
                    Giá: {item.price.toLocaleString("vi-VN")}đ
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold">
                    {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrderDetail;
