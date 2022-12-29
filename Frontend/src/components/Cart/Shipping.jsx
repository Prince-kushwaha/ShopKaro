import { Home, LocationCity, PinDrop } from "@mui/icons-material";
import React, { Fragment, useState } from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import PublicIcon from "@mui/icons-material/Public";
import "./Shipping.css";
import { Country, State, City } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { SaveShippingInfo } from "../../action-creater/cartActionCreater";
import CheckoutSteps from "./CheckoutSteps";
import { Navigate, useNavigate } from "react-router-dom";
function Shipping() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let cart = useSelector(function(state) {
    return state.cart;
  });

  let shippingInfo = cart.shippingInfo;
  let [city, setCity] = useState(shippingInfo.city);
  let [state, setState] = useState(shippingInfo.state);
  let [country, setCountry] = useState(shippingInfo.country);
  let [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  let [address, setAddress] = useState(shippingInfo.address);
  let [phone, setPhone] = useState(shippingInfo.phone);

  function handleChange(value, updateFunction) {
    updateFunction(value);
  }

  function submit() {
    let shippingD = {
      city,
      state,
      country,
      pinCode,
      address,
      phone,
    };
    dispatch(SaveShippingInfo(shippingD));
    navigate("/order/confirm");
  }

  return (
    <Fragment>
      <CheckoutSteps activeStep={0} />
      <div className="shippingContainer">
        <h2>Shipping Details</h2>
        <div className="shippingInfoBox">
          <div className="addressBox">
            <Home />
            <input
              type="text"
              value={address}
              placeholder="Address"
              onChange={function(event) {
                handleChange(event.target.value, setAddress);
              }}
            />
          </div>
          <div className="pinCodeBox">
            <PinDrop />
            <input
              type="tel"
              placeholder="PinCode"
              value={pinCode}
              onChange={(event) => handleChange(event.target.value, setPinCode)}
            />
          </div>
          <div className="cityBox">
            <PhoneIcon />
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(event) => handleChange(event.target.value, setCity)}
            />
          </div>
          <div className="phoneBox">
            <PhoneIcon />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(event) => handleChange(event.target.value, setPhone)}
            />
          </div>
          <div className="countryBox">
            <PublicIcon />
            <select
              name="country"
              id="country"
              value={country}
              onChange={(event) => handleChange(event.target.value, setCountry)}
            >
              {Country.getAllCountries().map(function(ICountry) {
                return (
                  <option value={ICountry.isoCode}>{ICountry.name}</option>
                );
              })}
            </select>
          </div>
          <div className="stateBox">
            <PublicIcon />
            <select
              name="state"
              id="State"
              value={state}
              onChange={(event) => handleChange(event.target.value, setState)}
            >
              {State.getStatesOfCountry(country).map(function(state) {
                return <option value={state.isoCode}>{state.name}</option>;
              })}
            </select>
          </div>
          <div className="submitBox">
            <input type="submit" onClick={submit} value="Continue" />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Shipping;
