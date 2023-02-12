import { useSelector } from "react-redux";
import OrderItemCard from "./OrderItemCard";
import "./orderItemCard.css";

function OrderSummary({ setCurrentCompopent }) {
  let { orderItems } = useSelector(function (state) {
    return state.createOrder;
  });

  let handleSubmit = function () {
    setCurrentCompopent(2);
  };

  return (
    <div className="order-summary-container">
      {orderItems.map((orderItem) => (
        <OrderItemCard info={orderItem} />
      ))}

      <div className="order-summary-btn mt-3">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default OrderSummary;
