import React from "react";
import { useOrders } from "~/context/OrderContext";

function Orders() {
  const { orders } = useOrders();

  return (
    <div className="pt-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Đơn hàng của tôi</h1>

        {orders.length === 0 ? (
          <p className="text-gray-500 text-center">Bạn chưa có đơn hàng nào</p>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-500">
                      Ngày đặt:{" "}
                      {new Date(order.orderDate).toLocaleDateString("vi-VN")}
                    </p>
                    <p className="text-sm text-gray-500">
                      Trạng thái:{" "}
                      <span className="text-yellow-600 font-medium">
                        {order.status}
                      </span>
                    </p>
                  </div>
                  <p className="text-lg font-bold text-blue-600">
                    {order.total.toLocaleString("vi-VN")}đ
                  </p>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-2">Sản phẩm</h3>
                  <div className="space-y-2">
                    {order.cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span>
                          {item.title} x {item.quantity}
                        </span>
                        <span>
                          {(item.price * item.quantity).toLocaleString("vi-VN")}
                          đ
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <h3 className="font-semibold mb-2">Thông tin giao hàng</h3>
                  <p className="text-gray-600">
                    {order.shippingAddress.name}
                    <br />
                    {order.shippingAddress.address},{" "}
                    {order.shippingAddress.ward},{" "}
                    {order.shippingAddress.district},{" "}
                    {order.shippingAddress.city}
                  </p>
                </div>

                <div className="border-t pt-4 mt-4">
                  <h3 className="font-semibold mb-2">Phương thức thanh toán</h3>
                  <p className="text-gray-600">
                    {order.paymentMethod === "cash" &&
                      "💵 Thanh toán khi nhận hàng (COD)"}
                    {order.paymentMethod === "bank" &&
                      "🏦 Chuyển khoản ngân hàng"}
                    {order.paymentMethod === "momo" && "💜 Ví MoMo"}
                    {order.paymentMethod === "zalopay" && "💙 ZaloPay"}
                  </p>
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
