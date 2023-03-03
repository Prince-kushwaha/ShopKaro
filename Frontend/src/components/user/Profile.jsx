import React from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import profileIcon from "../../images/Profile.png";
import MetaData from "../MetaData";

function Profile() {
  let navigator = useNavigate();
  let { user } = useSelector(function (state) {
    return state.login;
  });

  return (
    <div className="my-profile-container">
      <MetaData title="Your Account" />
      <h4>Your Account</h4>
      <div className="my-profile-box">
        <div
          className="your-order-box card"
          onClick={() => navigator("/orders")}
        >
          <div className="row">
            <div className="col-6">
              <img src="https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/Box._CB485927553_.png"></img>
            </div>
            <div className="col-6">
              <h6>Your Order</h6>
              <span class="a-color-secondary">
                Track, return, or buy things again
              </span>
            </div>
          </div>
        </div>
        <div className="your-login-box card">
          <div className="row">
            <div className="col-6">
              <img src="https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/sign-in-lock._CB485931504_.png"></img>
            </div>
            <div className="col-6">
              <h6>Login & security</h6>
              <span class="a-color-secondary">Edit login ,name and mobile</span>
            </div>
          </div>
        </div>
        <div className="your-addresses-box card" onClick={()=>navigator('/address')}>
          <div className="row">
            <div className="col-6">
              <img src="https://m.media-amazon.com/images/G/31/x-locale/cs/ya/images/address-map-pin._CB485934183_.png"></img>
            </div>
            <div className="col-6">
              <h6>Your Addresses</h6>
              <span class="a-color-secondary">
                Edit,addresses for order and gifts
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Profile;
