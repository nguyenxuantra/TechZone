
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import RootLayout from "./layout/RootLayout";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ProductManagement from "./pages/admin/ProductManagement";
import OrderManagement from "./pages/admin/OrderManagement";
import CustomerManagement from "./pages/admin/CustomerManagement";
import Settings from "./pages/admin/Settings";
import ProductCategories from "./pages/admin/ProductCategories";

import Login from "./pages/Login";
import Register from "./pages/Register";


const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>

        {/* Main App Routes */}
        <Route path="/" element={<RootLayout />}>

          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="categories" element={<ProductCategories />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="customers" element={<CustomerManagement />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </>
    )
  );
  return (
    <>
     
      <RouterProvider router={router} />
    </>

  );
};

export default App;
