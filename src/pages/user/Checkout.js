import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "~/context/AuthContext";
import { useCart } from "~/context/CartContext";
import { useOrders } from "~/context/OrderContext";
import { getProvinces, getDistricts, getWards } from "~/services/addressApi";
import { createOrder } from "~/services/orderApi";
import BankTransferInfo from "~/components/BankTransferInfo";

// Hàm mô phỏng tính phí ship dựa trên địa chỉ (giờ có thể dùng cả ID tỉnh/thành phố)
const calculateShippingCost = (address) => {
  // Logic mô phỏng: Ví dụ, phí ship thấp hơn cho Hà Nội (ID 01) hoặc TP. Hồ Chí Minh (ID 79)
  const lowerShippingProvinceCodes = ["1", "79"]; // Mã của Hà Nội và TP. Hồ Chí Minh từ API

  if (
    address.provinceCode &&
    lowerShippingProvinceCodes.includes(address.provinceCode)
  ) {
    return 20000; // Phí ship thấp hơn
  } else {
    return 30000; // Phí ship mặc định
  }
};

function Checkout() {
  const navigate = useNavigate();
  const { user, loading: authLoading, addresses } = useAuth();
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { addOrder } = useOrders();

  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    address: "",
    city: "",
    provinceCode: "",
    district: "",
    districtCode: "",
    ward: "",
    wardCode: "",
    postalCode: "",
    country: "Việt Nam",
  });

  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [shippingCost, setShippingCost] = useState(0);
  const [provinces, setProvinces] = useState([]); // Danh sách Tỉnh/Thành phố từ API
  const [districts, setDistricts] = useState([]); // Danh sách Quận/Huyện từ API
  const [wards, setWards] = useState([]); // Danh sách Phường/Xã từ API
  const [apiLoading, setApiLoading] = useState(true); // State loading cho API
  const [paymentMethod, setPaymentMethod] = useState("cash"); // Thêm state cho phương thức thanh toán

  const subtotal = getCartTotal();
  let total = Math.round(subtotal + shippingCost);

  // Fetch danh sách Tỉnh/Thành phố khi component mount
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const data = await getProvinces();
        setProvinces(data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      } finally {
        setApiLoading(false);
      }
    };
    fetchProvinces();
  }, []);

  // Fetch danh sách Quận/Huyện khi Tỉnh/Thành phố thay đổi
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (shippingAddress.provinceCode) {
      const fetchDistricts = async () => {
        try {
          const districts = await getDistricts(shippingAddress.provinceCode);
          setDistricts(districts);
          setWards([]); // Reset wards when province changes

          // Only update if we're not selecting a saved address and district is empty
          if (!selectedAddressId && !shippingAddress.districtCode) {
            setShippingAddress((prev) => ({
              ...prev,
              district: districts.length === 1 ? districts[0].name : "",
              districtCode: districts.length === 1 ? districts[0].code : "",
              ward: "",
              wardCode: "",
            }));
          }
        } catch (error) {
          console.error("Error fetching districts:", error);
          setDistricts([]);
          setWards([]);
        }
      };
      fetchDistricts();
    }
  }, [shippingAddress.provinceCode, selectedAddressId]);

  // Fetch danh sách Phường/Xã khi Quận/Huyện thay đổi
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (shippingAddress.districtCode) {
      const fetchWards = async () => {
        try {
          const wards = await getWards(shippingAddress.districtCode);
          setWards(wards);

          // Only update if we're not selecting a saved address and ward is empty
          if (!selectedAddressId && !shippingAddress.wardCode) {
            setShippingAddress((prev) => ({
              ...prev,
              ward: wards.length === 1 ? wards[0].name : "",
              wardCode: wards.length === 1 ? wards[0].code : "",
            }));
          }
        } catch (error) {
          console.error("Error fetching wards:", error);
          setWards([]);
        }
      };
      fetchWards();
    }
  }, [shippingAddress.districtCode, selectedAddressId]);

  const handleAddressSelect = useCallback(
    (addressId) => {
      const selectedAddress = addresses.find((addr) => addr.id === addressId);
      if (selectedAddress) {
        // First, set the selected address ID
        setSelectedAddressId(addressId);

        // Then update the shipping address
        setShippingAddress(selectedAddress);
      }
    },
    [addresses]
  );

  // Remove the auto-select effect since it's causing issues
  useEffect(() => {
    // Nếu chưa đăng nhập và AuthContext đã load xong, chuyển hướng đến trang đăng nhập
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  // Effect để tính toán lại phí ship khi shippingAddress thay đổi
  useEffect(() => {
    setShippingCost(calculateShippingCost(shippingAddress));
  }, [shippingAddress]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSelectedAddressId(null);
  };

  const handleProvinceChange = (e) => {
    const selectedCode = e.target.value;
    const selectedProvince = provinces.find(
      (p) => p.code === Number(selectedCode)
    );
    setSelectedAddressId(null); // Clear selected address when changing province
    setShippingAddress((prev) => ({
      ...prev,
      provinceCode: selectedCode,
      city: selectedProvince ? selectedProvince.name : "",
      district: "",
      districtCode: "",
      ward: "",
      wardCode: "",
      address: "",
    }));
  };

  const handleDistrictChange = (e) => {
    const selectedCode = e.target.value;
    const selectedDistrict = districts.find(
      (d) => d.code === Number(selectedCode)
    );
    setSelectedAddressId(null); // Clear selected address when changing district
    setShippingAddress((prev) => ({
      ...prev,
      districtCode: selectedCode,
      district: selectedDistrict ? selectedDistrict.name : "",
      ward: "",
      wardCode: "",
      address: "",
    }));
  };

  const handleWardChange = (e) => {
    const selectedCode = e.target.value;
    const selectedWard = wards.find((w) => w.code === Number(selectedCode));
    setSelectedAddressId(null); // Clear selected address when changing ward
    setShippingAddress((prev) => ({
      ...prev,
      wardCode: selectedCode,
      ward: selectedWard ? selectedWard.name : "",
      address: "",
    }));
  };

  const handlePlaceOrder = async () => {
    if (
      !shippingAddress.name ||
      !shippingAddress.address ||
      !shippingAddress.provinceCode ||
      !shippingAddress.districtCode ||
      !shippingAddress.wardCode
    ) {
      alert("Vui lòng điền đầy đủ thông tin địa chỉ giao hàng.");
      return;
    }

    try {
      const orderData = {
        cartItems,
        shippingAddress,
        subtotal,
        shippingCost,
        total,
        paymentMethod,
      };

      const result = await createOrder(orderData);

      if (result.success) {
        // Thêm đơn hàng vào OrderContext
        paymentMethod === "bank"
          ? addOrder({ ...orderData, status: "finished" })
          : addOrder(orderData);
        alert(result.message);
        console.log("Đơn hàng đã được thêm vào OrderContext");
        // Chuyển hướng trước khi xóa giỏ hàng
        clearCart();
        navigate("/orders");
        // Xóa giỏ hàng sau khi đã chuyển hướng
      } else {
        alert("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau.");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau.");
    }
  };

  // Hiển thị loading hoặc redirecting message khi đang kiểm tra auth hoặc API
  if (authLoading || !user || cartItems.length === 0 || apiLoading) {
    return (
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            {authLoading || apiLoading ? (
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            ) : (
              <p>Đang chuyển hướng...</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Xác nhận đơn hàng</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Thông tin địa chỉ giao hàng */}
          <div>
            <h2 className="text-xl font-bold mb-4">Địa chỉ giao hàng</h2>
            {/* Danh sách địa chỉ đã lưu */}
            {addresses.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">Chọn địa chỉ đã lưu</h3>
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className="flex items-start hover:bg-gray-50 p-2 rounded"
                    >
                      <input
                        type="radio"
                        id={`address-${address.id}`}
                        name="shippingAddressOption"
                        value={address.id}
                        checked={selectedAddressId === address.id}
                        onChange={() => handleAddressSelect(address.id)}
                        className="mt-1 mr-2 cursor-pointer"
                      />
                      <label
                        htmlFor={`address-${address.id}`}
                        className="flex-1 text-gray-700 cursor-pointer"
                      >
                        <span className="font-semibold">{address.name}</span> -{" "}
                        {address.address}, {address.ward}, {address.district},{" "}
                        {address.city}, {address.country}
                        {address.postalCode && (
                          <span> - {address.postalCode}</span>
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Form nhập địa chỉ mới */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold mb-4">Hoặc nhập địa chỉ mới</h3>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Họ tên
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={shippingAddress.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="province"
                >
                  Tỉnh/Thành phố
                </label>
                <select
                  id="province"
                  name="provinceCode"
                  value={shippingAddress.provinceCode}
                  onChange={handleProvinceChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="">-- Chọn Tỉnh/Thành phố --</option>
                  {provinces.map((province) => (
                    <option key={province.code} value={province.code}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="district"
                >
                  Quận/Huyện
                </label>
                <select
                  id="district"
                  name="districtCode"
                  value={shippingAddress.districtCode}
                  onChange={handleDistrictChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  required
                  disabled={
                    !shippingAddress.provinceCode || districts.length === 0
                  }
                >
                  <option value="">-- Chọn Quận/Huyện --</option>
                  {districts.map((district) => (
                    <option key={district.code} value={district.code}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="ward"
                >
                  Phường/Xã
                </label>
                <select
                  id="ward"
                  name="wardCode"
                  value={shippingAddress.wardCode}
                  onChange={handleWardChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  required
                  disabled={!shippingAddress.districtCode || wards.length === 0}
                >
                  <option value="">-- Chọn Phường/Xã --</option>
                  {wards.map((ward) => (
                    <option key={ward.code} value={ward.code}>
                      {ward.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="street-address"
                >
                  Địa chỉ (Số nhà, tên đường...)
                </label>
                <input
                  type="text"
                  id="street-address"
                  name="address"
                  value={shippingAddress.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="postalCode"
                >
                  Mã bưu chính (nếu có)
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={shippingAddress.postalCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="country"
                >
                  Quốc gia
                </label>
                {/* Quốc gia có thể là dropdown nếu cần nhiều quốc gia, tạm thời là input text và mặc định Việt Nam */}
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={shippingAddress.country}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Tóm tắt đơn hàng */}
          <div>
            <h2 className="text-xl font-bold mb-4">Tóm tắt đơn hàng</h2>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="border-b pb-4 mb-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center mb-2"
                  >
                    <span className="text-gray-700">
                      {item.title} ({item.quantity})
                    </span>
                    <span className="text-gray-900">
                      {(item.price * item.quantity).toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Tổng phụ</span>
                <span className="text-gray-900">
                  {subtotal.toLocaleString("vi-VN")}đ
                </span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700">Phí vận chuyển</span>
                {apiLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                ) : (
                  <span className="text-gray-900">
                    {shippingCost.toLocaleString("vi-VN")}đ
                  </span>
                )}
              </div>
              {/* Có thể thêm mã giảm giá ở đây */}
              <div className="flex justify-between items-center mb-4 font-bold text-lg">
                <span className="text-gray-900">Tổng cộng</span>
                {apiLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                ) : (
                  <span className="text-blue-600">
                    {total.toLocaleString("vi-VN")}đ
                  </span>
                )}
              </div>

              {/* Thêm phần chọn phương thức thanh toán */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">
                  Phương thức thanh toán
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="cash"
                      name="paymentMethod"
                      value="cash"
                      checked={paymentMethod === "cash"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-2"
                    />
                    <label
                      htmlFor="cash"
                      className="flex items-center cursor-pointer"
                    >
                      <span className="mr-2">💵</span>
                      Thanh toán khi nhận hàng (COD)
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="bank"
                      name="paymentMethod"
                      value="bank"
                      checked={paymentMethod === "bank"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-2"
                    />
                    <label
                      htmlFor="bank"
                      className="flex items-center cursor-pointer"
                    >
                      <span className="mr-2">🏦</span>
                      Chuyển khoản ngân hàng
                    </label>
                  </div>
                </div>

                {/* Hiển thị thông tin chuyển khoản khi chọn phương thức chuyển khoản ngân hàng */}
                {paymentMethod === "bank" && (
                  <BankTransferInfo totalPay={total} />
                )}
              </div>

              <button
                onClick={handlePlaceOrder}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
                disabled={
                  apiLoading ||
                  !shippingAddress.provinceCode ||
                  !shippingAddress.districtCode ||
                  !shippingAddress.wardCode
                }
              >
                {apiLoading ? "Đang tải..." : "Đặt hàng"}
              </button>
              {apiLoading && (
                <p className="text-center text-gray-500 text-sm mt-2">
                  Đang tải dữ liệu địa chỉ...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
