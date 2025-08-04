import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// components import
import Navbar from "./components/Navbar";
import LoadingScreen from "./components/LoadingScreen";

// pages import
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
import OrderSuccess from "./pages/OrderSuccess";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile.jsx";
import IdlePopup from "./pages/IdlePopup";
import OrderHistory from "./pages/OrderHistory";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import PaymentQr from "./pages/PaymentQr";
import PaymentSuccess from "./pages/PaymentSuccess";

// admin import
import AdminDashboard from "./admin/AdminDashboard";
import AdminHome from "./admin/AdminHome";
import AdminUsers from "./admin/AdminUsers";
import UpdateUser from "./admin/UpdateUser";
import AdminProducts from "./admin/AdminProducts";
import AdminCreateProduct from "./admin/AdminCreateProduct";
import AdminUpdateProductListing from "./admin/AdminUpdateProductListing";
import AdminUpdateProduct from "./admin/AdminUpdateProducts";
import AdminDeleteProduct from "./admin/AdminDeleteProduct";
import AdminAllProducts from "./admin/AdminAllProducts";
import AdminAllPayments from "./admin/AdminAllPayments";
import AdminOrder from "./admin/AdminOrder";
import AdminRoute from "./components/AdminRoute";
import AdminPostMenu from "./admin/AdminPostMenu";
import AdminCreatePost from "./admin/AdminCreatePost";
import AdminDeletePost from "./admin/AdminDeletePost";
import AdminUpdatePost from "./admin/AdminUpdatePost";
import AdminallPost from "./admin/AdminallPost";
import AdminBillMenu from "./admin/AdminBillMenu";
import AdminBilling from "./admin/AdminBilling";
import AdminAllBill from "./admin/AdminAllBill";
import AdminDueBill from "./admin/AdminDueBill";
import AdminContact from "./admin/AdminContact";
import AdminContactMessageCard from "./admin/AdminContactMessageCard";

// toast related import
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// cart
import { useCart } from "./context/CartContext";

function App() {
  const [user, setUser] = useState(null);
  const { cartItems } = useCart();

  console.log(cartItems);
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
          <Navbar user={user} setUser={setUser} cartItems={cartItems} />
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
            <Route path="/order-history" element={<OrderHistory />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/payment/:id" element={<PaymentQr />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/returns" element={<Returns />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password/:token" element={<ResetPassword />} />

            <Route
              path="/profile"
              element={<Profile user={user} setUser={setUser} />}
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
              {/* Admin Bill Menu */}
              <Route
                path="/admin/bills"
                element={
                  <AdminRoute>
                    <AdminBillMenu />
                  </AdminRoute>
                }
              />
              {/* Admin Billing */}
              <Route
                path="/admin/bills/create"
                element={
                  <AdminRoute>
                    <AdminBilling />
                  </AdminRoute>
                }
              />
              <Route
                path="/admin/allbills"
                element={
                  <AdminRoute>
                    <AdminAllBill />
                  </AdminRoute>
                }
              />
              {/* Due bill */}
              <Route
                path="/admin/bills/due"
                element={
                  <AdminRoute>
                    <AdminDueBill />
                  </AdminRoute>
                }
              />

              <Route index element={<AdminHome />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="users/update/:id" element={<UpdateUser />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="products/create" element={<AdminCreateProduct />} />
              <Route
                path="products/update"
                element={<AdminUpdateProductListing />}
              />
              <Route
                path="/admin/update-product/:id"
                element={<AdminUpdateProduct />}
              />
              <Route path="products/delete" element={<AdminDeleteProduct />} />
              <Route path="allproducts" element={<AdminAllProducts />} />
              <Route path="orders" element={<AdminOrder />} />
              <Route path="post" element={<AdminPostMenu />} />
              <Route path="post/create" element={<AdminCreatePost />} />
              <Route path="post/delete" element={<AdminDeletePost />} />
              <Route path="post/update" element={<AdminUpdatePost />} />
              <Route path="post/all" element={<AdminallPost />} />
              <Route path="allpayments" element={<AdminAllPayments />} />
              <Route path="allcontacts" element={<AdminContact />} />
              <Route
                path="allcontacts/message"
                element={<AdminContactMessageCard />}
              />
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
