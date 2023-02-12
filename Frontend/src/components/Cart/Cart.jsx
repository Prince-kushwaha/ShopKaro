import "./Cart.css";
import React, { Fragment, useEffect, useState } from "react";
import CartItemCard from "./CartItemCard";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import cartImage from "../../images/cartImage.webp";
import { Link, Navigate, useNavigate } from "react-router-dom";
import MetaData from "../MetaData";
import { processOrderActionCreater } from "../../action-creater/orderActionCreater";

function Cart() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [grossTotal, setGrossTotal] = useState(0);
  let [totalDiscount, setTotalDiscout] = useState(0);
  let cart = useSelector(function (state) {
    return state.cart;
  });

  let cartItems = cart.cartItems;

  useEffect(
    function () {
      let totalPrice = 0;
      let discountPrice = 0;
      for (let i = 0; cartItems && i < cartItems.length; i++) {
        totalPrice = totalPrice + cartItems[i].price * cartItems[i].quantity;
        discountPrice +=
          Math.round((cartItems[i].price / 100) * cartItems[i].discount) *
          cartItems[i].quantity;
      }
      setGrossTotal(totalPrice);
      setTotalDiscout(discountPrice);
    },
    [cartItems, cart]
  );

  function placeOrder() {
    let orderItems = cartItems;
    dispatch(processOrderActionCreater({ orderItems }));
    navigate("/checkOut");
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty-container card">
        <div className="cart-empty-box">
          <img
            alt="cart-image"
            src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
          ></img>
          <h5>Your cart is empty!</h5>
          <p>Add items to it now.</p>
          <Link to="/home" className="btn btn-primary w-100">
            Shop now
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="cart-container">
        <div className="cart-box">
          <div className="cart-products">
            {cartItems.map((cartItem) => (
              <CartItemCard info={cartItem} />
            ))}
          </div>
          <div className="cart-products-pricing">
            <div class="card  mb-3">
              <div class="card-header bg-transparent">
                <p>PRICE DETAILS</p>
              </div>
              <div class="card-body">
                <div className="total-price-box">
                  <p className="card-text">Price</p>
                  <p>₹{grossTotal}</p>
                </div>
                <div className="total-discount-box">
                  <p>Discount</p>
                  <p className="text-success">-₹{totalDiscount}</p>
                </div>
                <div className="total-amount-box">
                  <p>Total Amount</p>
                  <p>₹{grossTotal - totalDiscount}</p>
                </div>
              </div>
              <div class="card-footer bg-transparent ">
                <button
                  onClick={placeOrder}
                  className="btn w-100 btn-warning btn-lg"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
