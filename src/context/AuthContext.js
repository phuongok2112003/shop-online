import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra xem có thông tin đăng nhập trong localStorage không
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    // Kiểm tra xem có địa chỉ đã lưu trong localStorage không
    const storedAddresses = localStorage.getItem("addresses");
    if (storedAddresses) {
      setAddresses(JSON.parse(storedAddresses));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    // Có thể chọn xóa addresses khi logout hoặc giữ lại tùy nghiệp vụ
    setAddresses([]); // Xóa địa chỉ khi đăng xuất
    localStorage.removeItem("addresses");
  };

  // Hàm thêm địa chỉ mới
  const addAddress = (addressData) => {
    const newAddresses = [...addresses, { ...addressData, id: Date.now() }]; // Thêm ID tạm
    setAddresses(newAddresses);
    localStorage.setItem("addresses", JSON.stringify(newAddresses));
  };

  // Hàm cập nhật địa chỉ
  const updateAddress = (addressId, updatedData) => {
    const updatedAddresses = addresses.map(address => 
      address.id === addressId ? { ...address, ...updatedData } : address
    );
    setAddresses(updatedAddresses);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
  };

  // Hàm xóa địa chỉ
  const removeAddress = (addressId) => {
    const filteredAddresses = addresses.filter(address => address.id !== addressId);
    setAddresses(filteredAddresses);
    localStorage.setItem("addresses", JSON.stringify(filteredAddresses));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, addresses, addAddress, updateAddress, removeAddress }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
