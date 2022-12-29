import "./Cart.css";
import React, { useEffect, useState } from "react";
import CartItemCard from "./CartItemCard";
import { useDispatch, useSelector } from "react-redux";
import { UpdateCartItemQuantity } from "../../action-creater/cartActionCreater";
import Loader from "../layout/Loader/Loader";
import cartImage from "../../images/cartImage.webp";
import { Link } from "react-router-dom";

function Cart() {
  let [grossTotal, setGrossTotal] = useState(0);
  let dispatch = useDispatch();
  let cart = useSelector(function(state) {
    return state.cart;
  });

  useEffect(
    function() {
      let total = 0;
      for (let i = 0; cart && i < cart.cartItems.length; i++)
        total = total + cart.cartItems[i].price * cart.cartItems[i].quantity;
      setGrossTotal(total);
    },
    [cart]
  );

  function decreaseQuantity(id, quantity) {
    let newQuantity = quantity - 1;
    if (newQuantity == 0) return;
    dispatch(UpdateCartItemQuantity(id, newQuantity));
  }

  function increaseQuantity(id, quantity, stock) {
    let newQuantity = quantity + 1;
    if (newQuantity > stock) return;
    dispatch(UpdateCartItemQuantity(id, newQuantity));
  }

  if (cart == undefined) {
    return <Loader />;
  } else if (cart.cartItems.length == 0) {
    return (
      <div className="emptyCart">
        <img src={cartImage}></img>
        <Link to="/">View Products</Link>
      </div>
    );
  } else {
    return (
      <div className="cartContainer">
        <div className="cartHeader">
          <p>Product</p>
          <p>Quantity</p>
          <p>SubTotal</p>
        </div>

        <div className="cartItems">
          {cart.cartItems &&
            cart.cartItems.map(function(item) {
              return (
                <div className="product">
                  <div className="cart-card">
                    <CartItemCard details={item}></CartItemCard>
                  </div>
                  <div className="product-quantity">
                    <button
                      onClick={() => decreaseQuantity(item._id, item.quantity)}
                    >
                      -
                    </button>
                    <input type="number" readOnly value={item.quantity} />
                    <button
                      onClick={() =>
                        increaseQuantity(item._id, item.quantity, item.stock)
                      }
                    >
                      +
                    </button>
                  </div>
                  <div className="product-price">
                    <p>₹{item.quantity * item.price}</p>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="cartGrossPriceHeader">
          <div className="cartGrossPriceHeaderBox">
            <hr></hr>
            <div className="cartGrossTotalPrice">
              <p>GrossTotal</p>
              <p>{grossTotal}</p>
            </div>
            <div className="cartCheckOutButton">
              <Link to="/shipping">Check Out</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
