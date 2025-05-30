import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getProvinces, getDistricts, getWards } from "../services/addressApi";
import AddressForm from "~/components/AddressForm";

function Profile() {
  const {
    user,
    loading: authLoading,
    addresses,
    addAddress,
    updateAddress,
    removeAddress,
  } = useAuth();

  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    name: "",
    address: "", // Địa chỉ đường
    provinceCode: "",
    city: "",
    districtCode: "",
    district: "",
    wardCode: "",
    ward: "",
    postalCode: "",
    country: "Việt Nam",
  });

  const [editingAddressId, setEditingAddressId] = useState(null);
  const [editingAddressData, setEditingAddressData] = useState({
    name: "",
    address: "",
    provinceCode: "",
    city: "",
    districtCode: "",
    district: "",
    wardCode: "",
    ward: "",
    postalCode: "",
    country: "Việt Nam",
  });

  const [provinces, setProvinces] = useState([]);
  const [newDistricts, setNewDistricts] = useState([]); // Quận/Huyện cho form thêm mới
  const [newWards, setNewWards] = useState([]); // Phường/Xã cho form thêm mới
  const [editingDistricts, setEditingDistricts] = useState([]); // Quận/Huyện cho form sửa
  const [editingWards, setEditingWards] = useState([]); // Phường/Xã cho form sửa
  const [apiLoading, setApiLoading] = useState(true); // Loading chung cho API
  const [messeloi, setMesseloi] = useState("");
  // Lấy danh sách tỉnh/thành phố khi component được mount
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

  // Lấy danh sách quận/huyện cho form thêm mới khi tỉnh/thành phố thay đổi
  useEffect(() => {
    if (newAddress.provinceCode) {
      const fetchDistricts = async () => {
        try {
          const districts = await getDistricts(newAddress.provinceCode);
          setNewDistricts(districts);
          setNewWards([]); // Reset phường/xã
          setNewAddress((prevState) => ({
            ...prevState,
            districtCode: districts.length === 1 ? districts[0].code : "",
            district: districts.length === 1 ? districts[0].name : "",
            wardCode: "",
            ward: "",
          }));
        } catch (error) {
          console.error("Error fetching districts for new form:", error);
          setNewDistricts([]);
          setNewWards([]);
          setNewAddress((prevState) => ({
            ...prevState,
            districtCode: "",
            district: "",
            wardCode: "",
            ward: "",
          }));
        }
      };
      fetchDistricts();
    } else {
      setNewDistricts([]);
      setNewWards([]);
      setNewAddress((prevState) => ({
        ...prevState,
        districtCode: "",
        district: "",
        wardCode: "",
        ward: "",
      }));
    }
  }, [newAddress.provinceCode]);

  // Lấy danh sách phường/xã cho form thêm mới khi quận/huyện thay đổi
  useEffect(() => {
    if (newAddress.districtCode) {
      const fetchWards = async () => {
        try {
          const wards = await getWards(newAddress.districtCode);
          setNewWards(wards);
          setNewAddress((prevState) => ({
            ...prevState,
            wardCode: wards.length === 1 ? wards[0].code : "",
            ward: wards.length === 1 ? wards[0].name : "",
          }));
        } catch (error) {
          console.error("Error fetching wards for new form:", error);
          setNewWards([]);
          setNewAddress((prevState) => ({
            ...prevState,
            wardCode: "",
            ward: "",
          }));
        }
      };
      fetchWards();
    } else {
      setNewWards([]);
      setNewAddress((prevState) => ({
        ...prevState,
        wardCode: "",
        ward: "",
      }));
    }
  }, [newAddress.districtCode]);

  // Lấy danh sách quận/huyện cho form sửa khi tỉnh/thành phố thay đổi
  useEffect(() => {
    if (editingAddressData.provinceCode) {
      const fetchDistricts = async () => {
        try {
          const districts = await getDistricts(editingAddressData.provinceCode);
          setEditingDistricts(districts);
          setEditingWards([]); // Reset phường/xã
        } catch (error) {
          console.error("Error fetching districts for edit form:", error);
          setEditingDistricts([]);
          setEditingWards([]);
        }
      };
      fetchDistricts();
    } else {
      setEditingDistricts([]);
      setEditingWards([]);
    }
  }, [editingAddressData.provinceCode]);

  // Lấy danh sách phường/xã cho form sửa khi quận/huyện thay đổi
  useEffect(() => {
    if (editingAddressData.districtCode) {
      const fetchWards = async () => {
        try {
          const wards = await getWards(editingAddressData.districtCode);
          setEditingWards(wards);
        } catch (error) {
          console.error("Error fetching wards for edit form:", error);
          setEditingWards([]);
        }
      };
      fetchWards();
    } else {
      setEditingWards([]);
    }
  }, [editingAddressData.districtCode]);

  const handleInputChange = (e, isEditing = false) => {
    const { name, value } = e.target;
    setMesseloi("")
    if (isEditing) {
      setEditingAddressData((prev) => ({ ...prev, [name]: value }));
    } else {
      setNewAddress((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleProvinceChange = (e, isEditing = false) => {
    const selectedCode = e.target.value;
    const selectedProvince = provinces.find(
      (p) => p.code === Number(selectedCode)
    );

    const updateState = (prev) => ({
      ...prev,
      provinceCode: selectedCode,
      city: selectedProvince ? selectedProvince.name : "",
      districtCode: "",
      district: "",
      wardCode: "",
      ward: "",
    });

    if (isEditing) {
      setEditingAddressData(updateState);
    } else {
      setNewAddress(updateState);
    }
  };

  const handleDistrictChange = (e, isEditing = false) => {
    const selectedCode = e.target.value;
    const districts = isEditing ? editingDistricts : newDistricts;
    const selectedDistrict = districts.find(
      (d) => d.code === Number(selectedCode)
    );

    const updateState = (prev) => ({
      ...prev,
      districtCode: selectedCode,
      district: selectedDistrict ? selectedDistrict.name : "",
      wardCode: "",
      ward: "",
    });

    if (isEditing) {
      setEditingAddressData(updateState);
    } else {
      setNewAddress(updateState);
    }
  };

  const handleWardChange = (e, isEditing = false) => {
    const selectedCode = e.target.value;
    const wards = isEditing ? editingWards : newWards;
    const selectedWard = wards.find((w) => w.code === Number(selectedCode));

    const updateState = (prev) => ({
      ...prev,
      wardCode: selectedCode,
      ward: selectedWard ? selectedWard.name : "",
    });

    if (isEditing) {
      setEditingAddressData(updateState);
    } else {
      setNewAddress(updateState);
    }
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    // Validate required fields
    if (
      !newAddress.name.trim() ||
      !newAddress.address.trim() ||
      !newAddress.provinceCode ||
      !newAddress.districtCode ||
      !newAddress.wardCode
    ) {
      alert(
        "Vui lòng điền đầy đủ thông tin địa chỉ (Họ tên, Địa chỉ đường, Tỉnh/Thành phố, Quận/Huyện, Phường/Xã)."
      );
      return;
    }

    addAddress(newAddress);
    setNewAddress({
      name: "",
      address: "",
      provinceCode: "",
      city: "",
      districtCode: "",
      district: "",
      wardCode: "",
      ward: "",
      postalCode: "",
      country: "Việt Nam",
    });
    setShowAddForm(false);
  };

  const handleEditClick = (address) => {
    setEditingAddressId(address.id);
    setEditingAddressData(address);
    setShowAddForm(false); // Đóng form thêm mới nếu đang mở
    // API useEffects sẽ tự động fetch districts/wards dựa trên provinceCode/districtCode được set ở trên
  };

  const handleUpdateAddress = (e) => {
    e.preventDefault();
    // Validate required fields
    if (
      !editingAddressData.name ||
      !editingAddressData.address ||
      !editingAddressData.provinceCode ||
      !editingAddressData.districtCode ||
      !editingAddressData.wardCode
    ) {
      alert(
        "Vui lòng điền đầy đủ thông tin địa chỉ (Họ tên, Địa chỉ đường, Tỉnh/Thành phố, Quận/Huyện, Phường/Xã)."
      );
      return;
    }

    updateAddress(editingAddressId, editingAddressData);
    setEditingAddressId(null);
    setEditingAddressData({
      name: "",
      address: "",
      provinceCode: "",
      city: "",
      districtCode: "",
      district: "",
      wardCode: "",
      ward: "",
      postalCode: "",
      country: "Việt Nam",
    });
  };

  const handleCancelEdit = () => {
    setEditingAddressId(null);
    setEditingAddressData({
      name: "",
      address: "",
      provinceCode: "",
      city: "",
      districtCode: "",
      district: "",
      wardCode: "",
      ward: "",
      postalCode: "",
      country: "Việt Nam",
    });
  };
  const handleOnBulur = (e) => {
   if(!e.target.value.trim())
    setMesseloi("Moi ban nhap vao");
  };
  const handleRemoveAddress = (addressId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này?")) {
      removeAddress(addressId);
      if (editingAddressId === addressId) {
        // Nếu địa chỉ đang được sửa bị xóa
        handleCancelEdit();
      }
    }
  };

  // Hiển thị loading khi AuthContext đang load hoặc API đang load provinces lần đầu
  if (authLoading || (apiLoading && provinces.length === 0)) {
    return (
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  // ProtectedRoute sẽ xử lý chuyển hướng nếu không có user
  if (!user) {
    return null;
  }

  return (
    <div className="pt-16">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Thông tin tài khoản</h1>

        {/* Thông tin người dùng cơ bản */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4">Thông tin cá nhân</h2>
          <div className="mb-4">
            <span className="block text-gray-700 text-sm font-bold mb-2">
              Tên:
            </span>
            <p className="text-gray-900">{user.name}</p>
          </div>
          <div className="mb-4">
            <span className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </span>
            <p className="text-gray-900">{user.email}</p>
          </div>
        </div>

        {/* Địa chỉ giao hàng */}
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-4">Địa chỉ giao hàng của bạn</h2>

          {/* Danh sách địa chỉ */}
          {addresses.length === 0 ? (
            <p className="text-gray-600 mb-4">
              Bạn chưa có địa chỉ giao hàng nào được lưu.
            </p>
          ) : (
            <div className="space-y-4 mb-6">
              {addresses.map((address) => (
                <div key={address.id} className="border rounded-lg p-4">
                  <p className="font-semibold">{address.name}</p>
                  {/* Hiển thị địa chỉ đầy đủ từ các trường địa chỉ */}
                  <p className="text-gray-700 text-sm">
                    {address.address}, {address.ward}, {address.district},
                    {address.city}, {address.country}
                  </p>
                  {address.postalCode && (
                    <p className="text-gray-700 text-sm">
                      Mã bưu chính: {address.postalCode}
                    </p>
                  )}
                  <div className="mt-3 space-x-2">
                    <button
                      onClick={() => handleEditClick(address)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                      disabled={apiLoading}
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleRemoveAddress(address.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Form thêm/sửa địa chỉ */}
          {editingAddressId ? (
            <div>
              <h3 className="text-lg font-bold mb-4">Sửa địa chỉ</h3>
              {/* Spinner loading cho form sửa khi tải dữ liệu quận/huyện/phường/xã */}
              {apiLoading && editingAddressData.provinceCode && (
                <div className="flex justify-center items-center h-16">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              )}
              {/* Hiển thị form khi không loading hoặc đã tải xong */}
              {!(apiLoading && editingAddressData.provinceCode) && (
                <AddressForm
                  formData={editingAddressData}
                  handleChange={handleInputChange}
                  handleProvinceChange={handleProvinceChange}
                  handleDistrictChange={handleDistrictChange}
                  handleWardChange={handleWardChange}
                  provinces={provinces}
                  districts={editingDistricts}
                  wards={editingWards}
                  apiLoading={apiLoading}
                  onSubmit={handleUpdateAddress}
                  onCancel={handleCancelEdit}
                  isEditing={true}
                />
              )}
            </div>
          ) : showAddForm ? (
            <div>
              <h3 className="text-lg font-bold mb-4">Thêm địa chỉ mới</h3>
              {/* Spinner loading cho form thêm mới khi tải dữ liệu quận/huyện/phường/xã */}
              {apiLoading && newAddress.provinceCode && (
                <div className="flex justify-center items-center h-16">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              )}
              {/* Hiển thị form khi không loading hoặc đã tải xong */}
              {!(apiLoading && newAddress.provinceCode) && (
                <AddressForm
                  formData={newAddress}
                  handleChange={handleInputChange}
                  handleProvinceChange={handleProvinceChange}
                  handleDistrictChange={handleDistrictChange}
                  handleWardChange={handleWardChange}
                  provinces={provinces}
                  handleOnBulur={handleOnBulur}
                  messeloi={messeloi}
                  districts={newDistricts}
                  wards={newWards}
                  apiLoading={apiLoading}
                  onSubmit={handleAddAddress}
                  onCancel={() => setShowAddForm(false)}
                />
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              disabled={apiLoading} // Vô hiệu hóa nút nếu đang tải dữ liệu tỉnh/thành phố
            >
              Thêm địa chỉ mới
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
