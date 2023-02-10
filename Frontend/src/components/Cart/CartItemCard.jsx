import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RemoveCartItemAction } from "../../action-creater/cartActionCreater";
import { UpdateCartItemQuantity } from "../../action-creater/cartActionCreater";
function CartItemCard({ info }) {
  let { image, id, price, quantity, discount, stock, name } = info;
  let dispatch = useDispatch();
  function removeCartItem() {
    dispatch(RemoveCartItemAction(id));
  }

  function decreaseQuantity() {
    let newQuantity = quantity - 1;
    if (newQuantity === 0) return;
    dispatch(UpdateCartItemQuantity(id, newQuantity));
  }

  function increaseQuantity() {
    let newQuantity = quantity + 1;
    if (newQuantity > stock) return;
    dispatch(UpdateCartItemQuantity(id, newQuantity));
  }

  return (
    <div className="cartItemCard-box card">
      <div className="cartItemCard">
        <div className="cartItem-image">
          <img style={{ cursor: "pointer" }} alt="image" src={image} />
          <div className="cartItem-qnty">
            <button onClick={decreaseQuantity}>-</button>
            <input className="form-control" type="text" value={quantity} />
            <button onClick={increaseQuantity}>+</button>
          </div>
        </div>
        <div className="cartItem-info">
          <p>{name}</p>
          <div className="price">
            <p>₹{price - Math.round((price / 100) * discount)}</p>
            <span>
              <s>₹{price}</s>
            </span>
            <span>{discount}% off</span>
          </div>
          {stock === 0 && <p className="stockOut">Out of Stock</p>}
          <span onClick={removeCartItem}>Remove</span>
        </div>
      </div>
    </div>
  );
}

export default CartItemCard;
