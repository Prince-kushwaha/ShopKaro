import {
  Create_Order_Fail,
  Create_Order_Request,
  Create_Order_Success,
  Order_ErrorClean,
} from "../constants/orderConstansts";

let newOrderReducer = function(state = {}, action) {
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

export default newOrderReducer;
