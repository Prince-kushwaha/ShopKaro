import axios from "axios";
import {
  Create_Order_Fail,
  Create_Order_Request,
  Create_Order_Success,
  Get_My_Orders_Fail,
  Get_My_Orders_Request,
  Get_My_Orders_Success,
  OrderDetail_Fail,
  OrderDetail_Request,
  OrderDetail_Success,
  Order_ErrorClean,
  processOrder,
  REMOVE_CreateOrder_Item,
  UPDATE_CreateOrder_ITEM_QUANTITY,
} from "../constants/orderConstansts";

export let createOrder = function (order) {
  return async function (dispatch) {
    try {
      dispatch({
        type: Create_Order_Request,
      });

      let resp = await axios.post("/api/v1/order/new", order);
      dispatch({
        type: Create_Order_Success,
        payload: resp.data.order,
      });
    } catch (error) {
      dispatch({
        type: Create_Order_Fail,
        payload: error.response.data,
      });
    }
  };
};

export let getMyOrders = function () {
  return async function (dispatch) {
    try {
      dispatch({ type: Get_My_Orders_Request });
      let { data } = await axios.get("/api/v1/orders/me");
      dispatch({ type: Get_My_Orders_Success, payload: data.orders });
    } catch (error) {
      dispatch({ type: Get_My_Orders_Fail, payload: error.response.data });
    }
  };
};

export function getOrderDetails(orderId) {
  return async function (dispatch) {
    try {
      dispatch({ type: OrderDetail_Request });
      let { data } = await axios.get(`/api/v1/order/me/${orderId}`);
      dispatch({ type: OrderDetail_Success, payload: data.order });
    } catch (error) {
      alert(error.response.data);
      dispatch({ type: OrderDetail_Fail, payload: error.response });
    }
  };
}

export let processOrderActionCreater = function (info) {
  return function (dispatch) {
    dispatch({
      type: processOrder,
      payload: info,
    });
  };
};

export let UpdateCreateOrdertItemQuantity = function (id, quantity) {
  return function (dispatch) {
    dispatch({
      type: UPDATE_CreateOrder_ITEM_QUANTITY,
      payload: {
        id: id,
        quantity,
      },
    });
  };
};

export let RemoveCreateOrderItemAction = function (id) {
  return function (dispatch) {
    dispatch({
      type: REMOVE_CreateOrder_Item,
      payload: {
        id,
      },
    });
  };
};

export let clearErrors = function () {
  return function (dispatch) {
    // dispatch({
    //   type: Order_ErrorClean,
    // });
  };
};
