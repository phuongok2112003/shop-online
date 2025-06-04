import { mockOrders } from "../data/mockOrders";
// Trong thực tế, API_URL sẽ là URL của backend
const API_URL = "https://api.example.com";

// Giả lập độ trễ của API
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getOrders = async (sellerId) => {
  try {
    await delay(500);
    return mockOrders.filter((order) => order.sellerId === sellerId);
  } catch (error) {
    throw new Error("Không thể lấy danh sách đơn hàng");
  }
};

export const getOrder = async (id) => {
  try {
    await delay(300);
    const order = mockOrders.find((o) => o.id === parseInt(id));
    if (!order) {
      throw new Error("Không tìm thấy đơn hàng");
    }
    return order;
  } catch (error) {
    throw new Error(error.message || "Không thể lấy thông tin đơn hàng");
  }
};

export const updateOrderStatus = async (id, status) => {
  try {
    await delay(500);
    const index = mockOrders.findIndex((o) => o.id === parseInt(id));
    if (index === -1) {
      throw new Error("Không tìm thấy đơn hàng");
    }
    mockOrders[index] = {
      ...mockOrders[index],
      status,
      updatedAt: new Date().toISOString(),
    };
    return mockOrders[index];
  } catch (error) {
    throw new Error(error.message || "Không thể cập nhật trạng thái đơn hàng");
  }
};

export const createOrder = async (orderData) => {
  try {
    // Trong thực tế, bạn sẽ gọi API backend để tạo đơn hàng
    console.log("Creating order with:", orderData);

    // Mock response
    return {
      success: true,
      orderId: Date.now(),
      message: "Đặt hàng thành công!",
    };
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};
