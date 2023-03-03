import { useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import './address.css'

function Address() {
  let { user, loading } = useSelector(function (state) {
    return state.login;
  });

  return (
    <div className="address-container">
      <h6>Your Addresses</h6>
      <div className="address-box">
        <div className="create-address-box">
          <div className="box">
            <span>+</span>
            <p>Add Addresss</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Address;
