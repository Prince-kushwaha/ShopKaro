import {
  ADD_CART_Item,
  REMOVE_CART_Item,
  UPDATE_CART_ITEM_QUANTITY,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstants";
import axios from "axios";

export let addCartItemAction = function(id, quantity) {
  return async function(dispatch) {
    let response = await axios.get(`/api/v1/product/${id}`);
    let product = response.data.product;
    dispatch({
      type: ADD_CART_Item,
      payload: {
        _id: id,
        stock: product.stock,
        price: product.price,
        quantity,
      },
    });
  };
};

export let UpdateCartItemQuantity = function(id, quantity) {
  return function(dispatch) {
    dispatch({
      type: UPDATE_CART_ITEM_QUANTITY,
      payload: {
        _id: id,
        quantity,
      },
    });
  };
};

export let RemoveCartItemAction = function(id) {
  return function(dispatch) {
    dispatch({
      type: REMOVE_CART_Item,
      payload: id,
    });
  };
};

export let SaveShippingInfo = function(data) {
  return function(dispatch) {
    dispatch({
      type: SAVE_SHIPPING_INFO,
      payload: data,
    });
  };
};
