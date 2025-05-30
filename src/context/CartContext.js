import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  // Khởi tạo state giỏ hàng bằng cách đọc từ localStorage, nếu không có thì mặc định là mảng rỗng
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    return savedCartItems ? JSON.parse(savedCartItems) : [];
  });

  // Sử dụng useEffect để lưu state giỏ hàng vào localStorage mỗi khi nó thay đổi
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      console.log("Prev:", prevItems);
      console.log("Product: ", product);
      const quantity = product.quantity;
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        // Nếu sản phẩm đã có, tăng số lượng
        return prevItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + (quantity > 1 ? quantity : 1),
              }
            : item
        );
      } else {
        // Nếu sản phẩm chưa có, thêm mới với số lượng là 1
        return [
          ...prevItems,
          { ...product, quantity: quantity > 1 ? quantity : 1 },
        ];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prevItems) => {
      // Đảm bảo số lượng không nhỏ hơn 1
      const newQuantity = Math.max(1, quantity);
      return prevItems
        .map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
        .filter((item) => item.quantity > 0); // Loại bỏ nếu số lượng về 0
    });
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartItemsCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
