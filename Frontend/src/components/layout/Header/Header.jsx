import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import UserOption from "../../UserOption/UserOption";
import { ShoppingCart } from "@mui/icons-material";
import "./Header.css";

function Header() {
  let [keyword, setKeyword] = useState("");
  let navigate = useNavigate();
  let { isAuthenticated } = useSelector(function (state) {
    return state.login;
  });

  function search(event) {
    event.preventDefault();
    if (keyword) navigate("products/" + keyword);
  }

  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <Link class="navbar-brand" to="/home">
          ShopKaro
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/home">
                Home
              </Link>
            </li>
            <form class="d-flex nav-item" onSubmit={search}>
              <input
                class="form-control me-2"
                type="search"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="Search"
                aria-label="Search"
              />
              <button class="btn btn-light" type="submit">
                Search
              </button>
            </form>

            {!isAuthenticated && (
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/Login">
                  Login
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/cart">
                <ShoppingCart />
              </Link>
            </li>
            {isAuthenticated && <UserOption />}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
