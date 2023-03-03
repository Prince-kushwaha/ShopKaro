import React, { Fragment, useEffect, useState } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../components/MetaData";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import {
  getOrderDetails,
  clearErrors,
} from "../../action-creater/orderActionCreater";
import Loader from "../../components/layout/Loader/Loader";
import Toast from "./../../Toast";

const OrderDetails = () => {
  let { id } = useParams();
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  let [address, setAddress] = useState();

  useEffect(() => {
    if (error) {
      Toast(error, "error");
      dispatch(clearErrors());
    }
  }, [error]);

  useEffect(() => {
    let address = "";
    if (order) {
      let { pinCode, city, houseNumber, state, area } = order.shippingInfo;
      if (houseNumber) address = address + houseNumber + ", ";
      if (area) address = address + area + ", ";
      if (city) address = address + "City: " + city + ", ";
      if (state) address = address + "State: " + state + ", ";
      address = address + "India, ";
      if (pinCode) address = address + "PinCode: " + pinCode;
      setAddress(address);
    }
  }, [order]);

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [id]);

  if (loading === undefined || loading === true) {
    return <Loader></Loader>;
  } else {
    return (
      <Fragment>
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <MetaData title="Order Details" />
            <div className="order-detail-container">
              <div className="order-detail-box">
                <h5>Order Details</h5>
                <span>Ordered on 18 January 2022 | </span>
                <span>Order# 407-8175132-3839560</span>
                <div className="delivery-address-box card mt-3 mb-3">
                  <div className="row">
                    <div className="col-4">
                      <h6>Shipping Address</h6>
                      <h6>{order.shippingInfo.name}</h6>
                      <p>{address}</p>
                      <h6 className="d-inline">Phone Number: </h6>
                      <span>{order.shippingInfo.mobile}</span>
                    </div>
                    <div className="payment-method-box col-4">
                      <h6>Payment Methods</h6>
                      <p>{order.paymentInfo.paymentMethod}</p>
                    </div>
                    <div className="order-summary-container col-4">
                      <h6>Order Summary</h6>
                      <div className="order-summary-item-box row">
                        <p className="col-6">Item(s) Subtotal:</p>
                        <p className="col-6">
                          {order.totalItemPrice - order.totalDiscount}
                        </p>
                      </div>
                      <div className="order-summary-item-box row">
                        <p className="col-6">Shipping:</p>
                        <p className="col-6">{order.shippingPrice}</p>
                      </div>
                      <div className="order-summary-item-box row">
                        <h7 className="col-6">Grand Total:</h7>
                        <p className="col-6">{order.totalPayable}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card mt-4">
                  <div className="row">
                    <div className="col-2">
                      <img
                        style={{
                          objectFit: "contain",
                          width: 100,
                          height: 100,
                        }}
                        src="https://res.cloudinary.com/dfnxst9tf/image/upload/v1675399215/ProductImages/Lenovo%20Ideapad%20Slim%205i%20Core%20i5%2011th%20Gen/image1_dchky2.webp"
                      ></img>
                    </div>
                    <div className="col-6">
                      <h6>{order.orderItems[0].name}</h6>
                      <span>$888</span>
                    </div>
                    <div className="col-4">
                      <button className="btn btn-primary" type="button">
                        Write Product Review
                      </button>
                      <button className="btn btn-warning ml-2">
                        Cancel Order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
};

export default OrderDetails;
