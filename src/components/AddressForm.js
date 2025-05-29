import React from "react";

function AddressForm({
  formData,
  handleChange,
  handleProvinceChange,
  handleDistrictChange,
  handleWardChange,
  provinces,
  districts,
  wards,
  apiLoading,
  onSubmit,
  onCancel,
  isEditing = false,
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor={`${isEditing ? "edit" : "new"}-name`}
        >
          Họ tên
        </label>
        <input
          type="text"
          id={`${isEditing ? "edit" : "new"}-name`}
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor={`${isEditing ? "edit" : "new"}-province`}
        >
          Tỉnh/Thành phố
        </label>
        <select
          id={`${isEditing ? "edit" : "new"}-province`}
          name="provinceCode"
          value={formData.provinceCode}
          onChange={handleProvinceChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
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
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor={`${isEditing ? "edit" : "new"}-district`}
        >
          Quận/Huyện
        </label>
        <select
          id={`${isEditing ? "edit" : "new"}-district`}
          name="districtCode"
          value={formData.districtCode}
          onChange={handleDistrictChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
          disabled={!formData.provinceCode || districts.length === 0}
        >
          <option value="">-- Chọn Quận/Huyện --</option>
          {districts.map((district) => (
            <option key={district.code} value={district.code}>
              {district.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor={`${isEditing ? "edit" : "new"}-ward`}
        >
          Phường/Xã
        </label>
        <select
          id={`${isEditing ? "edit" : "new"}-ward`}
          name="wardCode"
          value={formData.wardCode}
          onChange={handleWardChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
          disabled={!formData.districtCode || wards.length === 0}
        >
          <option value="">-- Chọn Phường/Xã --</option>
          {wards.map((ward) => (
            <option key={ward.code} value={ward.code}>
              {ward.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor={`${isEditing ? "edit" : "new"}-address-street`}
        >
          Địa chỉ (Số nhà, tên đường...)
        </label>
        <input
          type="text"
          id={`${isEditing ? "edit" : "new"}-address-street`}
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor={`${isEditing ? "edit" : "new"}-postalCode`}
        >
          Mã bưu chính (nếu có)
        </label>
        <input
          type="text"
          id={`${isEditing ? "edit" : "new"}-postalCode`}
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label
          className="block text-sm font-medium text-gray-700"
          htmlFor={`${isEditing ? "edit" : "new"}-country`}
        >
          Quốc gia
        </label>
        <input
          type="text"
          id={`${isEditing ? "edit" : "new"}-country`}
          name="country"
          value={formData.country}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {isEditing ? "Lưu địa chỉ" : "Thêm địa chỉ"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
        >
          Hủy
        </button>
      </div>
    </form>
  );
}

export default AddressForm;
