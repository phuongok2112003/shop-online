import React, { useState, useEffect } from "react";
import { useAuth } from "~/context/AuthContext";
import { getStoreSettings, updateStoreSettings } from "~/services/settingsApi";

const Settings = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [settings, setSettings] = useState({
    storeName: "",
    storeDescription: "",
    storeAddress: "",
    storePhone: "",
    storeEmail: "",
    storeLogo: "",
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
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await getStoreSettings(user.id);
      setSettings(data);
      setLoading(false);
    } catch (err) {
      setError("Không thể tải cài đặt cửa hàng");
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (method) => {
    setSettings((prev) => ({
      ...prev,
      paymentMethods: {
        ...prev.paymentMethods,
        [method]: !prev.paymentMethods[method],
      },
    }));
  };

  const handleShippingMethodChange = (method) => {
    setSettings((prev) => ({
      ...prev,
      shippingMethods: {
        ...prev.shippingMethods,
        [method]: !prev.shippingMethods[method],
      },
    }));
  };

  const handleShippingFeeChange = (method, value) => {
    setSettings((prev) => ({
      ...prev,
      shippingFees: {
        ...prev.shippingFees,
        [method]: parseInt(value) || 0,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStoreSettings(user.id, settings);
      setSuccess("Cập nhật cài đặt thành công!");
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError("Không thể cập nhật cài đặt");
      setTimeout(() => setError(null), 3000);
    }
  };

  if (loading) return <div className="text-center p-4">Đang tải...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Cài đặt cửa hàng</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Thông tin cửa hàng */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Thông tin cửa hàng</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tên cửa hàng
              </label>
              <input
                type="text"
                name="storeName"
                value={settings.storeName}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email cửa hàng
              </label>
              <input
                type="email"
                name="storeEmail"
                value={settings.storeEmail}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Số điện thoại
              </label>
              <input
                type="tel"
                name="storePhone"
                value={settings.storePhone}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Địa chỉ
              </label>
              <input
                type="text"
                name="storeAddress"
                value={settings.storeAddress}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Mô tả cửa hàng
              </label>
              <textarea
                name="storeDescription"
                value={settings.storeDescription}
                onChange={handleInputChange}
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Logo cửa hàng (URL)
              </label>
              <input
                type="url"
                name="storeLogo"
                value={settings.storeLogo}
                onChange={handleInputChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Phương thức thanh toán */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Phương thức thanh toán</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="cod"
                checked={settings.paymentMethods.cod}
                onChange={() => handlePaymentMethodChange("cod")}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="cod" className="ml-2 block text-sm text-gray-900">
                Thanh toán khi nhận hàng (COD)
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="bankTransfer"
                checked={settings.paymentMethods.bankTransfer}
                onChange={() => handlePaymentMethodChange("bankTransfer")}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="bankTransfer"
                className="ml-2 block text-sm text-gray-900"
              >
                Chuyển khoản ngân hàng
              </label>
            </div>
            
          </div>
        </div>

        {/* Phương thức vận chuyển */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Phương thức vận chuyển</h2>
          <div className="space-y-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="standard"
                checked={settings.shippingMethods.standard}
                onChange={() => handleShippingMethodChange("standard")}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="standard"
                className="ml-2 block text-sm text-gray-900"
              >
                Giao hàng tiêu chuẩn
              </label>
              {settings.shippingMethods.standard && (
                <div className="ml-6">
                  <input
                    type="number"
                    value={settings.shippingFees.standard}
                    onChange={(e) =>
                      handleShippingFeeChange("standard", e.target.value)
                    }
                    className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Phí vận chuyển"
                  />
                  <span className="ml-2 text-sm text-gray-500">đồng</span>
                </div>
              )}
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="express"
                checked={settings.shippingMethods.express}
                onChange={() => handleShippingMethodChange("express")}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="express"
                className="ml-2 block text-sm text-gray-900"
              >
                Giao hàng nhanh
              </label>
              {settings.shippingMethods.express && (
                <div className="ml-6">
                  <input
                    type="number"
                    value={settings.shippingFees.express}
                    onChange={(e) =>
                      handleShippingFeeChange("express", e.target.value)
                    }
                    className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Phí vận chuyển"
                  />
                  <span className="ml-2 text-sm text-gray-500">đồng</span>
                </div>
              )}
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="freeShipping"
                checked={settings.shippingMethods.freeShipping}
                onChange={() => handleShippingMethodChange("freeShipping")}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="freeShipping"
                className="ml-2 block text-sm text-gray-900"
              >
                Miễn phí vận chuyển
              </label>
              {settings.shippingMethods.freeShipping && (
                <div className="ml-6">
                  <input
                    type="number"
                    value={settings.shippingFees.freeShippingThreshold}
                    onChange={(e) =>
                      handleShippingFeeChange(
                        "freeShippingThreshold",
                        e.target.value
                      )
                    }
                    className="mt-1 block w-32 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    placeholder="Ngưỡng miễn phí"
                  />
                  <span className="ml-2 text-sm text-gray-500">đồng</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Lưu cài đặt
          </button>
        </div>
      </form>
    </div>
  );
};

export default Settings;