import React, { createContext, useContext, useState, useEffect } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  // Đọc dữ liệu từ localStorage khi khởi tạo
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // Lưu vào localStorage mỗi khi orders thay đổi
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addOrder = (order) => {
    setOrders((prevOrders) => [
      {
        id: Date.now(), // Tạo ID tạm thời
        orderDate: new Date().toISOString(),
        status: "pending", // Trạng thái đơn hàng
        ...order,
      },
      ...prevOrders,
    ]);
  };

  const getOrders = () => {
    return orders;
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrders }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
}
