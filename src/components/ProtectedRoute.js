import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "~/context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

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

  // Nếu đã đăng nhập, hiển thị nội dung trang
  if (user) {
    return children;
  }

  // Nếu chưa đăng nhập, chuyển hướng về trang đăng nhập
  return <Navigate to="/login" replace />;
}

export default ProtectedRoute;
