// Trong thực tế, API_URL sẽ là URL của backend
const API_URL = "https://api.example.com";

export const getOrders = async (userId) => {
  try {
    // Trong thực tế, bạn sẽ gọi API backend để lấy danh sách đơn hàng
    // Dựa vào user.id hoặc token xác thực
    console.log("Fetching orders for user:", userId);

    // Mock data đơn hàng
    const mockOrders = [
      {
        id: 1,
        date: "2023-10-27",
        total: 750000,
        status: "Đã giao hàng",
        items: [
          { id: 1, title: "Sản phẩm A", quantity: 1, price: 500000 },
          { id: 2, title: "Sản phẩm B", quantity: 1, price: 250000 },
        ],
      },
      {
        id: 2,
        date: "2023-10-25",
        total: 1200000,
        status: "Đang xử lý",
        items: [{ id: 3, title: "Sản phẩm C", quantity: 2, price: 600000 }],
      },
    ];

    // Giả lập thời gian fetch data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockOrders);
      }, 1000);
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
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
