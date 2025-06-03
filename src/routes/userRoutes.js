import Home from "../pages/user/Home";
import Products from "../pages/user/Products";
import ProductDetail from "../pages/user/ProductDetail";
import Cart from "../pages/user/Cart";
import Contact from "../pages/user/Contact";
import Login from "../pages/Login";
import Register from "../pages/user/Register";
import Checkout from "../pages/user/Checkout";
import Profile from "../pages/user/Profile";
import Orders from "../pages/user/Orders";
import Layout from "~/components/layouts/UserLayout";

const userRoutes = [
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/products",
    element: (
      <Layout>
        <Products />
      </Layout>
    ),
  },
  {
    path: "/products/:id",
    element: (
      <Layout>
        <ProductDetail />
      </Layout>
    ),
  },
  {
    path: "/cart",
    element: (
      <Layout>
        <Cart />
      </Layout>
    ),
  },
  {
    path: "/contact",
    element: (
      <Layout>
        <Contact />
      </Layout>
    ),
    protected: true,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/checkout",
    element: (
      <Layout>
        <Checkout />
      </Layout>
    ),
    protected: true,
  },
  {
    path: "/profile",
    element: (
      <Layout>
        <Profile />
      </Layout>
    ),
    protected: true,
  },
  {
    path: "/orders",
    element: (
      <Layout>
        <Orders />
      </Layout>
    ),
    protected: true,
  },
];

export default userRoutes;
