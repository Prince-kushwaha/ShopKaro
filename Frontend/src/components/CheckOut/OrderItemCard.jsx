import React from "react";
import "./../Cart/CartItemCard.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  RemoveCreateOrderItemAction,
  UpdateCreateOrdertItemQuantity,
} from "../../action-creater/orderActionCreater";

function OrderItemCard({ info }) {
  let { image, id, price, quantity, discount, stock, name } = info;
  let dispatch = useDispatch();
  function removeOrderItem() {
    dispatch(RemoveCreateOrderItemAction(id));
  }

  function decreaseQuantity() {
    let newQuantity = quantity - 1;
    if (newQuantity === 0) return;
    dispatch(UpdateCreateOrdertItemQuantity(id, newQuantity));
  }

  function increaseQuantity() {
    let newQuantity = quantity + 1;
    if (newQuantity > stock) return;
    dispatch(UpdateCreateOrdertItemQuantity(id, newQuantity));
  }

  return (
    <div className="cartItemCard-box card mt-2">
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
          <span onClick={removeOrderItem}>Remove</span>
        </div>
      </div>
    </div>
  );
}

export default OrderItemCard;
