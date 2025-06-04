// Trong thực tế, API_URL sẽ là URL của backend
const API_URL = "https://api.example.com";

// Giả lập độ trễ của API
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Dữ liệu mẫu cho cài đặt cửa hàng
const mockSettings = {
  storeName: "Shop Online",
  storeDescription: "Cửa hàng bán lẻ trực tuyến",
  storeAddress: "123 Đường ABC, Quận 1, TP.HCM",
  storePhone: "0123456789",
  storeEmail: "contact@shoponline.com",
  storeLogo: "https://example.com/logo.png",
  paymentMethods: {
    cod: true,
    bankTransfer: true,

  },
  shippingMethods: {
    standard: true,
    express: true,
    freeShipping: false,
  },
  shippingFees: {
    standard: 30000,
    express: 50000,
    freeShippingThreshold: 1000000,
  },
};

export const getStoreSettings = async (sellerId) => {
  try {
    await delay(500);
    // Trong thực tế, bạn sẽ gọi API để lấy cài đặt của cửa hàng
    return mockSettings;
  } catch (error) {
    throw new Error("Không thể lấy cài đặt cửa hàng");
  }
};

export const updateStoreSettings = async (sellerId, settings) => {
  try {
    await delay(500);
    // Trong thực tế, bạn sẽ gọi API để cập nhật cài đặt của cửa hàng
    console.log(
      "Updating settings for seller",
      sellerId,
      "with data:",
      settings
    );
    return { success: true, message: "Cập nhật cài đặt thành công" };
  } catch (error) {
    throw new Error("Không thể cập nhật cài đặt cửa hàng");
  }
};
