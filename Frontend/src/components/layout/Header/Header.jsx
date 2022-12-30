import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import UserOption from "../../UserOption/UserOption";
import { ShoppingCart } from "@mui/icons-material";

function Header() {
  let [keyword, updateKeyword] = useState("");
  let navigate = useNavigate();
  let { isAuthenticated } = useSelector(function(state) {
    return state.login;
  });

  function handleSearch(event) {
    event.preventDefault();
    navigate("products/" + keyword);
  }

  function handleChangeEvent(event) {
    updateKeyword(event.target.value);
  }

  return (
    <div className="header">
      <h3>ShopKaro</h3>
      <Link to="/home">Home</Link>
      <input
        placeholder="Search for products, brand and more"
        type="search"
        onChange={handleChangeEvent}
      ></input>
      <input type="submit" value="Search" onClick={handleSearch} />
      {!isAuthenticated && <Link to="/Login">Login</Link>}
      {!isAuthenticated && <Link to="/sign">SignUp</Link>}
      {/* <Link to="">About</Link>
      <Link to="">Contact</Link> */}
      <Link to="/cart">
        <ShoppingCart />
      </Link>
      {isAuthenticated && <UserOption />}
    </div>
  );
}

export default Header;
