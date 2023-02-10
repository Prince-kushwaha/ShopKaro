import Shipping from "../Cart/Shipping";
import "./CheckOut.css";

function CheckOut() {
  return (
    <div className="checkout-container">
      <div className="checkout-box">
        <div className="checkout-options card">
          <Shipping />
        </div>
        <div className="checkout-products-pricing">
          <div class="card  mb-3">
            <div class="card-header bg-transparent">
              <p>PRICE DETAILS</p>
            </div>
            <div class="card-body">
              <div className="total-price-box">
                <p className="card-text">Price</p>
                <p>₹{0}</p>
              </div>
              <div className="total-discount-box">
                <p>Discount</p>
                <p className="text-success">-₹{0}</p>
              </div>
              <div className="total-delivery-box">
                <p>Delivery Charge</p>
                <p className="text-success">-₹{0}</p>
              </div>
              <div className="total-amount-box">
                <p>Total Payable</p>
                <p>₹{0 - 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
