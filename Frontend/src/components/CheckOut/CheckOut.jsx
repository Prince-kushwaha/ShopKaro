import { useEffect, useState } from "react";
import Shipping from "./Shipping";
import "./CheckOut.css";
import OrderSummary from "./OrderSummary";
import Payment from "./Payment";
import { useSelector } from "react-redux";
import CheckoutSteps from "./CheckoutSteps";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
function CheckOut() {
  let [stripeApiKey, setStripeApiKey] = useState(undefined);
  let [grossTotal, setGrossTotal] = useState(0);
  let [totalDiscount, setTotalDiscout] = useState(0);
  let [currentCompopent, setCurrentCompopent] = useState(0);
  let [delivery, setDelivery] = useState(20);
  let order = useSelector(function (state) {
    return state.createOrder;
  });

  useEffect(
    function () {
      let totalPrice = 0;
      let discountPrice = 0;
      let orderItems = order.orderItems;
      for (let i = 0; orderItems && i < orderItems.length; i++) {
        totalPrice = totalPrice + orderItems[i].price * orderItems[i].quantity;
        discountPrice +=
          Math.round((orderItems[i].price / 100) * orderItems[i].discount) *
          orderItems[i].quantity;
      }
      setGrossTotal(totalPrice);
      setTotalDiscout(discountPrice);
    },
    [order]
  );

  useEffect(() => {
    (async function () {
      let response = await axios.get("/api/v1/stripeapikey");
      setStripeApiKey(response.data.stripeApikey);
    })();
  }, []);

  return (
    <div className="checkout-container">
      <div className="checkout-box">
        <div className="checkout-options card">
          <CheckoutSteps activeStep={currentCompopent} />
          {currentCompopent === 0 && (
            <Shipping setCurrentCompopent={setCurrentCompopent} />
          )}
          {currentCompopent === 1 && (
            <OrderSummary setCurrentCompopent={setCurrentCompopent} />
          )}
          {currentCompopent === 2 && stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <Payment />
            </Elements>
          )}
        </div>
        <div className="checkout-products-pricing">
          <div class="card  mb-3">
            <div class="card-header bg-transparent">
              <p>PRICE DETAILS</p>
            </div>
            <div class="card-body">
              <div className="total-price-box">
                <p className="card-text">Price</p>
                <p>₹{grossTotal}</p>
              </div>
              <div className="total-discount-box">
                <p>Discount</p>
                <p className="text-success">-₹{totalDiscount}</p>
              </div>
              <div className="total-delivery-box">
                <p>Delivery Charge</p>
                <p className="text-success">₹{delivery}</p>
              </div>
              <div className="total-amount-box">
                <p>Total Payable</p>
                <p>₹{grossTotal - totalDiscount + delivery}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
