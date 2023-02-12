import {
  Create_Order_Fail,
  Create_Order_Request,
  Create_Order_Success,
  Order_ErrorClean,
  processOrder,
  REMOVE_CreateOrder_Item,
  UPDATE_CreateOrder_ITEM_QUANTITY,
} from "../constants/orderConstansts";
import toast from "../Toast";

let newOrderReducer = function (state = {}, action) {
  switch (action.type) {
    case Create_Order_Request:
      return {
        loading: true,
      };
    case Create_Order_Success:
      return {
        loading: false,
        order: action.payload,
      };
    case Create_Order_Fail:
      return {
        ...state,
        loading: false,
        err: action.payload,
      };

    case Order_ErrorClean:
      return {
        ...state,
        err: null,
      };
    default:
      return state;
  }
};

export let processOrderReducer = function (state = {}, action) {
  let productId, newOrderItems, newState;
  switch (action.type) {
    case processOrder:
      return { ...state, ...action.payload };
    case REMOVE_CreateOrder_Item:
      productId = action.payload.id;
      newOrderItems = state.orderItems.filter(function (item) {
        return productId !== item.id;
      });
      
      newState = { ...state, orderItems: newOrderItems };
      toast("product removed", "success");
      return newState;
    case UPDATE_CreateOrder_ITEM_QUANTITY:
      productId = action.payload.id;
      let newQuantity = action.payload.quantity;
      newState = { ...state };
      for (let i = 0; i < newState.orderItems.length; i++) {
        if (productId === newState.orderItems[i].id) {
          newState.orderItems[i].quantity = newQuantity;
        }
      }

      toast("product qnty update", "success");
      return newState;
    default:
      return state;
  }
};

export default newOrderReducer;
