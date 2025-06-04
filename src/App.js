import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { OrderProvider } from "./context/OrderContext";
import { CategoryProvider } from "./context/CategoryContext";
import { ThemeProvider } from "./context/ThemeContext";
import UserRoutes from "./routes/userRoutes";
import AdminRoutes from "./routes/adminRoutes";

function App() {
  useEffect(() => {
    // Thêm class dark vào thẻ html
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <OrderProvider>
            <CategoryProvider>
              <Router>
                <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/admin/*" element={<AdminRoutes />} />
                      <Route path="/*" element={<UserRoutes />} />
                    </Routes>
                  </main>
                </div>
              </Router>
            </CategoryProvider>
          </OrderProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
