import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "~/context/AuthContext";

function ProtectedAdminRoute({ children }) {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user || !isAdmin()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedAdminRoute; 