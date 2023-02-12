import React, { Fragment, useEffect, useState } from "react";
import "./Shipping.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { ShippingDialog } from "./ShippingDialogBox";
import Toast from "../../Toast";
import { processOrderActionCreater } from "../../action-creater/orderActionCreater";

function Shipping({ setCurrentCompopent }) {
  let [addressIndex, setAddressIndex] = useState(0);
  let dispatch = useDispatch();
  let { loading, user, err } = useSelector(function (state) {
    return state.login;
  });

  function handleRadioButton(event) {
    setAddressIndex(event.target.value);
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
    if (pinCode) address = address + "PinCode: " + pinCode;
    return (
      <div className="address-box card">
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="address"
            value={index}
            defaultChecked={index === 0}
            onChange={handleRadioButton}
            id={"address-" + (index + 1)}
          />
          <label class="form-check-label" for={"address-" + (index + 1)}>
            <div className="address-content">
              <div className="box">
                <h6>{name}</h6>
                <h6>{mobile}</h6>
              </div>
              <p>{address}</p>
            </div>
          </label>
        </div>
      </div>
    );
  }

  function handleUseAddress() {
    let shippingInfo;
    if (user.address.length === 0) {
      Toast("Add An Address", "error");
    } else {
      shippingInfo = user.address[addressIndex];
      dispatch(processOrderActionCreater({ shippingInfo }));
      setCurrentCompopent(1);
    }
  }

  if (loading === undefined || loading) {
    <Loader />;
  } else
    return (
      <Fragment>
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
