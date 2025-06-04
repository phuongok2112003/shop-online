import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "~/context/AuthContext";

// Danh sách các route cần đăng nhập
const protectedPaths = ["/profile", "/orders", "/checkout", "/cart"];

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Nếu AuthContext đang load, hiển thị loading
  if (loading) {
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

  // Kiểm tra xem route hiện tại có cần bảo vệ không
  const isProtectedPath = protectedPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  // Nếu là route cần bảo vệ và chưa đăng nhập
  if (isProtectedPath && !user) {
    return <Navigate to="/login" replace />;
  }

  // Nếu đã đăng nhập và có role không phải user
  if (user && !["user"].includes(user.role)) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}

export default ProtectedRoute;
