import React from "react";
import "./app.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import {
  Home,
  Contact,
  About,
  Orders,
  Products,
  Auth,
  Dashboard,
  Profile,
  Cart,
  Shipping,
  ConfirmOrder,
  Success,
  OrderDetails,
} from "./pages";
import store from "./store";
import ProductDetail from "./components/ProductDetail";
import { useEffect } from "react";
import { loadUser } from "./actions/userAction";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoutes from "./components/Route/ProtectedRoute";
import UpdateProfile from "./pages/profile/updateProfile";
import UpdatePassword from "./pages/profile/updatePassword";
import ForgetPassword from "./pages/profile/forgetPassword";
import ResetPassword from "./pages/profile/resetPassword";
import { getOrders } from "./actions/orderAction";
function App() {
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getOrders());
  }, []);
  return (
    <Router>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/product/:id" element={<ProductDetail />} />
        <Route exact path="/products/:keywords" element={<Products />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/auth" element={<Auth />} />
        <Route element={<ProtectedRoutes />}>
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/orders" element={<Orders />}/>
          <Route exact path="/order/:id" element={<OrderDetails />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/me/update" element={<UpdateProfile />} />
          <Route exact path="/password/update" element={<UpdatePassword />} />
          <Route exact path="/shipping" element={<Shipping />} />
          <Route exact path="/order/confirm" element={<ConfirmOrder />} />
          <Route exact path="/password/reset/:token" element={<ResetPassword />} />
          <Route exact path="/password/forgot" element={<ForgetPassword />} />
          <Route exact path="/success" element={<Success />} />
        </Route>
        <Route exact path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
export default App;
