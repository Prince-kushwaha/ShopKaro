import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Footer from "./components/layout/Footer/Footer";
import Home from "./components/Home/Home.jsx";
import "./App.css";
import ProductDetails from "./components/Product Details/ProductDetails";
import Search from "./components/Search/Search";
import Login from "./components/user/Login";
import SignUp from "./components/user/SignUp";
import { loadUser } from "./action-creater/userActionCreater";
import store from "./store";
import Profile from "./components/user/Profile.jsx";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import ProfileUpdate from "./components/user/ProfileUpdate.jsx";
import ChangePassword from "./components/user/ChangePassword";
import PasswordForget from "./components/user/PasswordForget";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
function App() {
  let [stripeApiKey, setStripeApiKey] = useState("");
  async function getStripeApiKey() {
    let { data } = await axios.get("/stripeapikey");
    setStripeApiKey(data.stripeApikey);
  }

  useEffect(function() {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/product/:id" element={<ProductDetails />}></Route>
          <Route path="/products/:keyword" element={<Search />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/sign" element={<SignUp />}></Route>
          <Route
            path="/account"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          ></Route>

          <Route
            path="/account/me/update"
            element={
              <RequireAuth>
                <ProfileUpdate />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/account/me/password"
            element={
              <RequireAuth>
                <ChangePassword />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/password/forget"
            element={
              <RequireAuth>
                <PasswordForget />
              </RequireAuth>
            }
          ></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route
            path="/account"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/shipping"
            element={
              <RequireAuth>
                <Shipping />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/order/confirm"
            element={
              <RequireAuth>
                <ConfirmOrder />
              </RequireAuth>
            }
          ></Route>
          {stripeApiKey && (
            <Route
              path="/process/payment"
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <RequireAuth>
                    <Payment />
                  </RequireAuth>
                </Elements>
              }
            ></Route>
          )}
          <Route
            path="/success"
            element={
              <RequireAuth>
                <OrderSuccess />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/orders"
            element={
              <RequireAuth>
                <MyOrders />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/order/:id"
            element={
              <RequireAuth>
                <OrderDetails />
              </RequireAuth>
            }
          ></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
