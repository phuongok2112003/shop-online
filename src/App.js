import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { OrderProvider } from "./context/OrderContext";
import routes from "./routes";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <Router>
            <div className="min-h-screen bg-gray-100 flex flex-col">
              <main className="flex-grow">
                <Routes>
                  {routes.map((route) => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={
                        route.protected ? (
                          <ProtectedRoute>{route.element}</ProtectedRoute>
                        ) : (
                          route.element
                        )
                      }
                    />
                  ))}
                </Routes>
              </main>
            </div>
          </Router>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
