import React, { Fragment, useEffect, useState } from "react";
import "./Shipping.css";
import { useSelector } from "react-redux";
import CheckoutSteps from "./CheckoutSteps";
import Loader from "../layout/Loader/Loader";
import { ShippingDialog } from "./ShippingDialogBox";
import Toast from "../../Toast";

function Shipping() {
  let [address, setAddress] = useState(0);
  let { loading, user, err } = useSelector(function (state) {
    return state.login;
  });

  function handleRadioButton(event) {
    setAddress(event.target.value);
  }

  useEffect(() => {
    if (err) Toast(err, "error");
  }, [err]);

  function MapAddresses(
    { name, pinCode, city, houseNumber, state, mobile, area },
    index
  ) {
    let address = "";
    if (houseNumber) address = address + houseNumber + ", ";
    if (area) address = address + area + ", ";
    if (city) address = address + "City: " + city + ", ";
    if (state) address = address + "State: " + state + ", ";
    if (pinCode) address = address + "PinCode: " + pinCode + ", ";
    address = address + "Mobile: " + mobile;
    return (
      <div className="address-box">
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="address"
            value={index}
            onChange={handleRadioButton}
            id={"address-" + (index + 1)}
          />
          <label class="form-check-label" for={"address-" + (index + 1)}>
            <div className="address-content">
              <span>{name}</span>
              <span>{address}</span>
            </div>
          </label>
        </div>
      </div>
    );
  }

  function handleUseAddress() {
    let shippingAddress;
    if (user.address.length === 0) {
      Toast("Add An Address", "error");
    } else {
      shippingAddress = user.address[address];
    }
  }

  if (loading === undefined || loading) {
    <Loader />;
  } else
    return (
      <Fragment>
        <CheckoutSteps activeStep={0} />
        <div className="shipping-container">
          <div className="shipping-box">
            <div class="card">
              <div class="card-header">
                <h5>Your Addresses</h5>
              </div>
              <div class="card-body">
                {user.address.map(MapAddresses)}
                <ShippingDialog />
              </div>
              <div class="card-footer text-muted">
                <button className="btn btn-warning" onClick={handleUseAddress}>
                  Use address
                </button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
}

export default Shipping;
