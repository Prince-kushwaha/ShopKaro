import {
  ADD_CART_Item,
  REMOVE_CART_Item,
  UPDATE_CART_ITEM_QUANTITY,
} from "../constants/cartConstants";

export let addCartItemAction = function (
  name,
  id,
  price,
  imageUrl,
  stock,
  discount,
  quantity
) {
  return function (dispatch) {
    dispatch({
      type: ADD_CART_Item,
      payload: {
        name: name,
        id: id,
        stock: stock,
        price: price,
        image: imageUrl,
        discount: discount,
        quantity,
      },
    });
  };
};

export let UpdateCartItemQuantity = function (id, quantity) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_CART_ITEM_QUANTITY,
      payload: {
        id: id,
        quantity,
      },
    });
  };
};

export let RemoveCartItemAction = function (id) {
  return function (dispatch) {
    dispatch({
      type: REMOVE_CART_Item,
      payload: {
        id,
      },
    });
  };
};
