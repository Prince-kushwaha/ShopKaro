import {
  ADD_CART_Item,
  REMOVE_CART_Item,
  SAVE_SHIPPING_INFO,
  UPDATE_CART_ITEM_QUANTITY,
} from "../constants/cartConstants";
import toast from "../Toast";

export let cartReducer = function (
  state = { cartItems: [], shippingInfo: {} },
  action
) {
  let newCartItems = [];
  let newState = {};
  let productId = 1;
  switch (action.type) {
    case ADD_CART_Item:
      let cartItem = action.payload;
      newCartItems = state.cartItems.filter(function (item) {
        return item.id !== cartItem.id;
      });

      newState = {
        ...state,
        cartItems: [...newCartItems, cartItem],
      };

      localStorage.setItem("cartItems", JSON.stringify(newState.cartItems));
      toast("product add to cart ", "success");
      return newState;
    case REMOVE_CART_Item:
      productId = action.payload.id;
      newCartItems = state.cartItems.filter(function (item) {
        return productId !== item.id;
      });
      newState = { ...state, cartItems: newCartItems };
      localStorage.setItem("cartItems", JSON.stringify(newState.cartItems));
      toast("product removed from  cart", "success");
      return newState;
    case UPDATE_CART_ITEM_QUANTITY:
      productId = action.payload.id;
      let newQuantity = action.payload.quantity;
      newState = { ...state };
      for (let i = 0; i < newState.cartItems.length; i++) {
        if (productId === newState.cartItems[i].id) {
          newState.cartItems[i].quantity = newQuantity;
        }
      }

      localStorage.setItem("cartItems", JSON.stringify(newState.cartItems));
      toast("product qnty update", "success");
      return newState;
    case SAVE_SHIPPING_INFO:
      let shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));
      return { ...state, shippingInfo: shippingInfo };
    default:
      return state;
  }
};
