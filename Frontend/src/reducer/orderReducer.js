import {
  Get_My_Orders_CleanError,
  Get_My_Orders_Fail,
  Get_My_Orders_Request,
  Get_My_Orders_Success,
  OrderDetail_CleanError,
  OrderDetail_Request,
  OrderDetail_Fail,
  OrderDetail_Success,
} from "../constants/orderConstansts";

function orderReducer(state = { orders: [] }, action) {
  switch (action.type) {
    case Get_My_Orders_Request:
      return { loading: true, ...state };
    case Get_My_Orders_Success:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case Get_My_Orders_Fail:
      return {
        ...state,
        error: action.payload,
        orders: [],
      };
    case Get_My_Orders_CleanError:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}

export function OrderDetailReducer(state = {}, action) {
  switch (action.type) {
    case OrderDetail_Request:
      return {
        loading: true,
      };
    case OrderDetail_Success:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    case OrderDetail_Fail:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case OrderDetail_CleanError:
      return {
        loading: false,
        ...state,
        error: null,
      };
    default:
      return state;
  }
}

export default orderReducer;
