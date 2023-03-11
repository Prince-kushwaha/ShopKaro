import { useState } from "react";
import { useSelector } from "react-redux";
import { ShippingDialog } from "../CheckOut/ShippingDialogBox";
import Loader from "../layout/Loader/Loader";
import MetaData from "../MetaData";
import "./address.css";

function Address() {
  let { user, loading } = useSelector(function (state) {
    return state.login;
  });

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className="address-container">
        <MetaData title="Your Addresses" />
        <div className="address-container-box">
          <h2 className="m-3">Your Addresses</h2>
          <div className="card-columns">
            <div className="card border-warning">
              <div className="create-address-box">
                <div className="box">
                  <ShippingDialog />
                </div>
              </div>
            </div>
            {user.address.map(AdddressCard)}
          </div>
        </div>
      </div>
    );
  }
}

function AdddressCard(address) {
  return (
    <div className="address-content-box card border-success">
      <div className="card-body">
        <h6>{address.name}</h6>
        <li>{address.houseNumber}</li>
        <li> {address.area}</li>
        <li>
          {address.city}, {address.state} {address.pinCode}
        </li>
        <li>India</li>
        <li>Phone number :{address.mobile}</li>
      </div>
      <div className="card-footer">
        <button className="btn">Remove</button>
      </div>
    </div>
  );
}

export default Address;
