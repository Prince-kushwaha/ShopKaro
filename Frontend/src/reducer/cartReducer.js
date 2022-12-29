import {
  ADD_CART_Item,
  REMOVE_CART_Item,
  SAVE_SHIPPING_INFO,
  UPDATE_CART_ITEM_QUANTITY,
} from "../constants/cartConstants";

export let cartReducer = function(
  state = { cartItems: [], shippingInfo: {} },
  action
) {
  switch (action.type) {
    case ADD_CART_Item:
      let cartItem = action.payload;
      let newCartItems = state.cartItems.filter(function(item) {
        return item._id != cartItem._id;
      });

      let newState = {
        ...state,
        cartItems: [...newCartItems, cartItem],
      };

      localStorage.setItem("cartItems", JSON.stringify(newState.cartItems));
      alert("added to cart ");
      return newState;
    case REMOVE_CART_Item:
      let productId = action.payload;
      newCartItems = state.cartItems.filter(function(item) {
        return productId != item._id;
      });

      newState = { ...state, cartItems: newCartItems };
      localStorage.setItem("cartItems", JSON.stringify(newState.cartItems));
      return newState;
    case UPDATE_CART_ITEM_QUANTITY:
      productId = action.payload._id;
      let newQuantity = action.payload.quantity;
      newState = { ...state };
      for (let i = 0; i < newState.cartItems.length; i++) {
        if (productId == newState.cartItems[i]._id) {
          newState.cartItems[i].quantity = newQuantity;
        }
      }

      localStorage.setItem("cartItems", JSON.stringify(newState.cartItems));
      return newState;
    case SAVE_SHIPPING_INFO:
      let shippingInfo = action.payload;
      localStorage.setItem("shippingInfo", JSON.stringify(shippingInfo));
      return { ...state, shippingInfo: shippingInfo };
    default:
      return state;
  }
};
