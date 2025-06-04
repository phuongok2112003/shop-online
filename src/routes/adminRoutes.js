import React from "react";
import { Routes, Route } from "react-router-dom";
import ProductManagement from "../pages/admin/ProductManagement";
import AddProduct from "../pages/admin/AddProduct";
import EditProduct from "../pages/admin/EditProduct";
import Dashboard from "../pages/admin/Dashboard";
import AdminOrderDetail from "../pages/admin/AdminOrderDetail";
import Categories from "../pages/admin/Categories";
import AdminProtectedRoute from "~/components/ProtectedAdminRoute";
import Orders from "../pages/admin/Orders";
import Settings from "../pages/admin/Settings";

function AdminRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AdminProtectedRoute>
             <Dashboard />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/products"
        element={
          <AdminProtectedRoute>
            <ProductManagement />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/products/new"
        element={
          <AdminProtectedRoute>
            <AddProduct />
          </AdminProtectedRoute>
        }
      />
      <Route
        path="/products/:id/edit"
        element={
          <AdminProtectedRoute>
            <EditProduct />
          </AdminProtectedRoute>
        }
      />
        <Route
          path="/orders"
          element={
            <AdminProtectedRoute>
              <Orders />
            </AdminProtectedRoute>
          }
        />
      <Route
        path="/orders/:id"
        element={
          <AdminProtectedRoute>
            <AdminOrderDetail />
          </AdminProtectedRoute>
        }
      />
       <Route
        path="/settings"
        element={
          <AdminProtectedRoute>
            <Settings />
          </AdminProtectedRoute>
        }
      />
        <Route
        path="/categories"
        element={
          <AdminProtectedRoute>
            <Categories />
          </AdminProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AdminRoutes;
