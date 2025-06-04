import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "~/context/AuthContext";
import AdminLayout from "~/components/layouts/AdminLayout";
function ProtectedAdminRoute({ children }) {
  const { user, loading } = useAuth();

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

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!["admin", "seller"].includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <AdminLayout>{children}</AdminLayout>;
}

export default ProtectedAdminRoute; 