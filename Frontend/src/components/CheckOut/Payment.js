import React, { Fragment, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../MetaData";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";
import "./payment.css";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from "@mui/icons-material/Event";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import {
  createOrder,
  clearErrors,
} from "../../action-creater/orderActionCreater";
import { useNavigate } from "react-router-dom";
import Toast from "../../Toast";
import Loader from "../layout/Loader/Loader";

const Payment = ({
  totalPayable,
  totalDiscount,
  totalItemPrice,
  shippingPrice,
}) => {
  let navigate = useNavigate();
  let order = useSelector(function (state) {
    return state.createOrder;
  });

  let { loading, newOrder, err } = useSelector(function (state) {
    return state.newOrder;
  });

  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { user } = useSelector((state) => state.login);

  const paymentData = {
    amount: totalPayable,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        Toast(result.error.message, "error");
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            transactionNumber: result.paymentIntent.id,
            paymentStatus: result.paymentIntent.status,
            paymentMethod: "Online",
            paymentDate: Date.now(),
          };

          order.totalDiscount = totalDiscount;
          order.shippingPrice = shippingPrice;
          order.totalItemPrice = totalItemPrice;
          order.totalPayable = totalPayable;
          dispatch(createOrder(order));
          payBtn.current.disabled = false;
        } else {
          Toast("There's some issue while processing payment", "error");
          payBtn.current.disabled = false;
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      Toast(error.response.data.message, "error");
    }
  };

  useEffect(() => {
    if (err) {
      Toast(err, "error");
      dispatch(clearErrors());
    }
  }, [dispatch, err]);

  useEffect(() => {
    if (newOrder) {
      navigate("/success");
    }
  }, [newOrder]);

  if (loading) {
    return <Loader />;
  } else
    return (
      <Fragment>
        <MetaData title="Payment" />
        <div className="payment-container">
          <div className="payment-box">
            <div className="payment-form">
              <h4>Card Info</h4>
              <div className="input-box form-control">
                <CreditCardIcon />
                <CardNumberElement className="payment-input" />
              </div>
              <div className="input-box form-control">
                <EventIcon />
                <CardExpiryElement className="payment-input" />
              </div>
              <div className="input-box form-control">
                <VpnKeyIcon />
                <CardCvcElement className="payment-input" />
              </div>
              <input
                type="submit"
                value={`Pay - ₹${0}`}
                ref={payBtn}
                onClick={submitHandler}
                className="payment-btn btn"
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
};

export default Payment;
