import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import FAQ from "./pages/FAQ";
import Returns from "./pages/Returns";
import Shipping from "./pages/Shipping";
import Contact from "./pages/Contact";
import AdminDashboard from "./admin/AdminDashboard";
import AdminHome from "./admin/AdminHome";
import AdminUsers from "./admin/AdminUsers";
import UpdateUser from "./admin/UpdateUser";
import AdminProducts from "./admin/AdminProducts";
import AdminCreateProduct from "./admin/AdminCreateProduct";
import AdminUpdateProduct from "./admin/AdminUpdateProduct";
import AdminDeleteProduct from "./admin/AdminDeleteProduct";
import AdminAllProducts from "./admin/AdminAllProducts";
import AdminOrder from "./admin/AdminOrder";
import OrderSuccess from "./pages/OrderSuccess";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import AdminPostMenu from "./admin/AdminPostMenu";
import AdminCreatePost from "./admin/AdminCreatePost";
import AdminDeletePost from "./admin/AdminDeletePost";
import AdminUpdatePost from "./admin/AdminUpdatePost";
import AdminallPost from "./admin/AdminallPost";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingScreen from "./components/LoadingScreen";
import IdlePopup from "./pages/IdlePopup";
import OrderHistory from "./pages/OrderHistory.jsx";
import PrivateRoute from "./components/PrivateRoute";
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("userInfo");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Router>
          <Navbar user={user} setUser={setUser} />
          {!user && <IdlePopup />}
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/profile"
              element={<Profile user={user} setUser={setUser} />}
            />

            {/* protected route for order history*/}
            <Route
              path="/order-history"
              element={
                <PrivateRoute>
                  <OrderHistory />
                </PrivateRoute>
              }
            />

            {/* Admin Routes - Protected */}
            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              }
            >
              <Route index element={<AdminHome />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="users/update/:id" element={<UpdateUser />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/create" element={<AdminCreateProduct />} />
              <Route path="products/update" element={<AdminUpdateProduct />} />
              <Route path="products/delete" element={<AdminDeleteProduct />} />
              <Route path="allproducts" element={<AdminAllProducts />} />
              <Route path="orders" element={<AdminOrder />} />
              <Route path="post" element={<AdminPostMenu />} />
              <Route path="post/create" element={<AdminCreatePost />} />
              <Route path="post/delete" element={<AdminDeletePost />} />
              <Route path="post/update" element={<AdminUpdatePost />} />
              <Route path="post/all" element={<AdminallPost />} />
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<PageNotFound />} />
          </Routes>

          <ToastContainer position="top-center" autoClose={3000} />
        </Router>
      )}
    </>
  );
}

export default App;
