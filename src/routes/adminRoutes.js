import Dashboard from "../pages/admin/Dashboard";
import ProductList from "../pages/admin/ProductList";
import AddProduct from "../pages/admin/AddProduct";
import EditProduct from "../pages/admin/EditProduct";
import AdminLayout from "../components/layouts/AdminLayout";

const adminRoutes = [
  {
    path: "/admin",
    element: (
      <AdminLayout>
        <Dashboard />
      </AdminLayout>
    ),
    protected: true,
  },
  {
    path: "/admin/products",
    element: (
      <AdminLayout>
        <ProductList />
      </AdminLayout>
    ),
    protected: true,
  },
  {
    path: "/admin/products/add",
    element: (
      <AdminLayout>
        <AddProduct />
      </AdminLayout>
    ),
    protected: true,
  },
  {
    path: "/admin/products/edit/:id",
    element: (
      <AdminLayout>
        <EditProduct />
      </AdminLayout>
    ),
    protected: true,
  },
];

export default adminRoutes;
