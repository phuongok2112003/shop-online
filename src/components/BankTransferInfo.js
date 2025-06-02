import React, { useState, useEffect } from "react";


function BankTransferInfo({ totalPay }) {
  const [selectedBank, setSelectedBank] = useState("vcb");
  const [bankAccounts, setBankAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showQRModal, setShowQRModal] = useState(false);


  // Fetch danh sách tài khoản ngân hàng
  useEffect(() => {
    // Fake data cho demo
    const fakeData = [
      {
        id: "cake",
        name: "Ngân hàng số Cake",
        accountNumber: "0365921103",
        accountName: "SHOP ONLINE",
        branch: "Hà Nội",
        bankCode: "CAKE",
      },
      {
        id: "tcb",
        name: "Techcombank",
        accountNumber: "186862112003",
        accountName: "SHOP ONLINE",
        branch: "Hà Nội",
        bankCode: "TCB",
      },
      {
        id: "mbb",
        name: "MB Bank",
        accountNumber: "011234567",
        accountName: "NGUYEN XUAN PHUONG",
        branch: "Hải Dương",
        bankCode: "MB",
      },
    ];

    // Giả lập API call
    setTimeout(() => {
      setBankAccounts(fakeData);
      setLoading(false);
    }, 500);

    // Khi có API thật, thay thế bằng đoạn code sau:
    /*
    const fetchBankAccounts = async () => {
      try {
        const response = await fetch('YOUR_API_ENDPOINT/bank-accounts');
        const data = await response.json();
        setBankAccounts(data);
      } catch (error) {
        console.error("Error fetching bank accounts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBankAccounts();
    */
  }, []);

  // Tạo URL QR code với thông tin đơn hàng
  const generateQRCodeUrl = (bank) => {
    // Các trường bắt buộc
    const requiredFields = {
      accountNo: bank.accountNumber,
      accountName: bank.accountName,
      acqId: bank.bankCode,
    };

    console.log(totalPay);
    // Các trường tùy chọn
    const optionalFields = {
      addInfo: `Thanh toan don hang ${Date.now()}`, // Nội dung chuyển khoản
      amount: totalPay, // Số tiền cần chuyển
    };

    // Tạo URL với các trường bắt buộc
    let qrUrl = `https://api.vietqr.io/image/${bank.bankCode}-${bank.accountNumber}-${bank.accountName}-compact2.png?`;

    // Thêm các trường bắt buộc vào URL
    // Object.entries(requiredFields).forEach(([key, value]) => {
    //   qrUrl += `${key}=${encodeURIComponent(value)}&`;
    // });

    // Thêm các trường tùy chọn vào URL
    Object.entries(optionalFields).forEach(([key, value]) => {
      qrUrl += `${key}=${encodeURIComponent(value)}&`;
    });

    // Xóa dấu & ở cuối URL
    return qrUrl.slice(0, -1);
  };

  if (loading) {
    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <h4 className="font-semibold mb-4">Thông tin chuyển khoản</h4>

      {/* Chọn ngân hàng */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Chọn ngân hàng để chuyển khoản:
        </label>
        <div className="grid grid-cols-3 gap-2">
          {bankAccounts.map((bank) => (
            <button
              key={bank.id}
              onClick={() => setSelectedBank(bank.id)}
              className={`p-2 rounded-lg border ${
                selectedBank === bank.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-blue-300"
              }`}
            >
              <div className="text-sm font-medium">{bank.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Thông tin tài khoản đã chọn */}
      {bankAccounts.map(
        (bank) =>
          selectedBank === bank.id && (
            <div key={bank.id}>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Ngân hàng:</span> {bank.name}
                </p>
                <p>
                  <span className="font-medium">Số tài khoản:</span>{" "}
                  {bank.accountNumber}
                </p>
                <p>
                  <span className="font-medium">Chủ tài khoản:</span>{" "}
                  {bank.accountName}
                </p>
                <p>
                  <span className="font-medium">Chi nhánh:</span> {bank.branch}
                </p>
                <p>
                  <span className="font-medium">Số tiền:</span>{" "}
                  {totalPay.toLocaleString("vi-VN")}đ
                </p>
                <p>
                  <span className="font-medium">Nội dung chuyển khoản:</span>{" "}
                  Thanh toan don hang {Date.now()}
                </p>
              </div>

              {/* Mã QR */}
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Quét mã QR để thanh toán</h4>
                <div
                  className="bg-white p-2 rounded-lg inline-block cursor-pointer"
                  onClick={() => setShowQRModal(true)}
                >
                  <img
                    src={generateQRCodeUrl(bank)}
                    alt="Mã QR thanh toán"
                    className="w-48 h-48"
                  />
                </div>
              </div>
            </div>
          )
      )}

      {/* Modal hiển thị QR code lớn */}
      {showQRModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowQRModal(false)}
        >
          <div
            className="bg-white p-6 rounded-lg max-w-2xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Mã QR thanh toán</h3>
              <button
                onClick={() => setShowQRModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl"
              >
                ✕
              </button>
            </div>
            <div className="flex justify-center">
              <img
                src={generateQRCodeUrl(
                  bankAccounts.find((bank) => bank.id === selectedBank)
                )}
                alt="Mã QR thanh toán"
                className="w-96 h-96"
              />
            </div>
            <p className="text-center text-sm text-gray-600 mt-6">
              Click vào bất kỳ đâu bên ngoài để đóng
            </p>
          </div>
        </div>
      )}

      <div className="mt-4 text-sm text-gray-600">
        <p>Lưu ý:</p>
        <ul className="list-disc list-inside">
          <li>Vui lòng chuyển khoản đúng số tiền và nội dung</li>
          <li>Đơn hàng sẽ được xử lý sau khi chúng tôi nhận được thanh toán</li>
          <li>Nếu cần hỗ trợ, vui lòng liên hệ hotline: 1900-xxxx</li>
        </ul>
      </div>
    </div>
  );
}

export default BankTransferInfo;
