import React from "react";

function PaymentMethods({ totalPay, paymentMethod }) {
  // Hàm xử lý thanh toán MoMo
  const handleMoMoPayment = () => {
    // Thông tin cấu hình MoMo
    const partnerCode = "MOMO"; // Thay bằng partner code thật
    const accessKey = "YOUR_ACCESS_KEY"; // Thay bằng access key thật
    const secretKey = "YOUR_SECRET_KEY"; // Thay bằng secret key thật
    const orderInfo = `Thanh toan don hang ${Date.now()}`;
    const orderId = `ORDER_${Date.now()}`;
    const redirectUrl = "http://localhost:3000/payment/success"; // URL sau khi thanh toán thành công
    const ipnUrl = "http://localhost:3000/payment/ipn"; // URL nhận thông báo từ MoMo
    const amount = totalPay.toString();
    const requestId = orderId;
    const requestType = "captureWallet";
    const extraData = "";

    // Tạo URL thanh toán MoMo
    const momoUrl = `https://test-payment.momo.vn/v2/gateway/api/create`;

    // Trong thực tế, bạn cần:
    // 1. Tạo chữ ký (signature) theo hướng dẫn của MoMo
    // 2. Gửi request POST đến MoMo API
    // 3. Redirect người dùng đến URL thanh toán

    console.log("Redirecting to MoMo payment...");
    // window.location.href = momoUrl; // Uncomment khi đã cấu hình xong
  };

  // Hàm xử lý thanh toán ZaloPay
  const handleZaloPayPayment = () => {
    // Thông tin cấu hình ZaloPay
    const appId = "YOUR_APP_ID"; // Thay bằng app id thật
    const key1 = "YOUR_KEY1"; // Thay bằng key1 thật
    const key2 = "YOUR_KEY2"; // Thay bằng key2 thật
    const orderInfo = `Thanh toan don hang ${Date.now()}`;
    const orderId = `ORDER_${Date.now()}`;
    const amount = totalPay;
    const callbackUrl = "http://localhost:3000/payment/success"; // URL sau khi thanh toán thành công

    // Tạo URL thanh toán ZaloPay
    const zalopayUrl = `https://sandbox.zalopay.com.vn/v001/tpe/createorder`;

    // Trong thực tế, bạn cần:
    // 1. Tạo chữ ký (mac) theo hướng dẫn của ZaloPay
    // 2. Gửi request POST đến ZaloPay API
    // 3. Redirect người dùng đến URL thanh toán

    console.log("Redirecting to ZaloPay payment...");
    // window.location.href = zalopayUrl; // Uncomment khi đã cấu hình xong
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      {paymentMethod === "momo" && (
        <div>
          <h4 className="font-semibold mb-4">Thanh toán qua MoMo</h4>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png"
                alt="MoMo"
                className="w-12 h-12"
              />
              <div>
                <p className="font-medium">
                  Số tiền thanh toán: {totalPay.toLocaleString("vi-VN")}đ
                </p>
                <p className="text-sm text-gray-600">
                  Quét mã QR hoặc chuyển hướng đến ứng dụng MoMo
                </p>
              </div>
            </div>
            <button
              onClick={handleMoMoPayment}
              className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 flex items-center justify-center space-x-2"
            >
              <span>💜</span>
              <span>Thanh toán với MoMo</span>
            </button>
          </div>
        </div>
      )}

      {paymentMethod === "zalopay" && (
        <div>
          <h4 className="font-semibold mb-4">Thanh toán qua ZaloPay</h4>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <img
                src="https://upload.wikimedia.org/wikipedia/vi/8/8c/ZaloPay_Logo.png"
                alt="ZaloPay"
                className="w-12 h-12"
              />
              <div>
                <p className="font-medium">
                  Số tiền thanh toán: {totalPay.toLocaleString("vi-VN")}đ
                </p>
                <p className="text-sm text-gray-600">
                  Quét mã QR hoặc chuyển hướng đến ứng dụng ZaloPay
                </p>
              </div>
            </div>
            <button
              onClick={handleZaloPayPayment}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
            >
              <span>💙</span>
              <span>Thanh toán với ZaloPay</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentMethods;
