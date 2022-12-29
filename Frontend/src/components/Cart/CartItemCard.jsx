import React from "react";
import "./CartItemCard.css";
import productImage from "../../images/productImages/jeans1.jpg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RemoveCartItemAction } from "../../action-creater/cartActionCreater";
function CartItemCard(props) {
  let { details } = props;
  let dispatch = useDispatch();
  let productUrl = "/product/" + details._id;
  function removeCartItem(id) {
    dispatch(RemoveCartItemAction(id));
  }
  return (
    <div className="CartItemCard">
      <div className="product-image">
        <img src={productImage}></img>
      </div>
      <div className="product-info">
        <Link to={productUrl}>{details.name}</Link>
        <p>Price:₹{details.price}</p>
        <button onClick={() => removeCartItem(details._id)}>Remove</button>
      </div>
    </div>
  );
}

export default CartItemCard;
