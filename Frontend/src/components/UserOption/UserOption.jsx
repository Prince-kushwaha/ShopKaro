import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "../../action-creater/userActionCreater";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import Settings from "@mui/icons-material/Settings";
import Dashboard from "@mui/icons-material/Dashboard";
import "./UserOption.css";

export default function AccountMenu() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { user } = useSelector(function (state) {
    return state.login;
  });

  function Logout() {
    dispatch(userLogout());
  }

  return (
    <li class="nav-item dropdown">
      <a
        class="nav-link dropdown-toggle"
        href="#"
        id="navbarDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        {user.name}
      </a>

      <div class="dropdown-menu" aria-labelledby="navbarDropdown">
        <Link className="dropdown-item" to="/account">
          <div className="dropdown-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              class=""
              viewBox="0 0 16 14"
            >
              <path
                fill="#2874F1"
                fill-rule="nonzero"
                d="M7 .333A6.67 6.67 0 0 0 .333 7 6.67 6.67 0 0 0 7 13.667 6.67 6.67 0 0 0 13.667 7 6.67 6.67 0 0 0 7 .333zm0 2c1.107 0 2 .894 2 2 0 1.107-.893 2-2 2s-2-.893-2-2c0-1.106.893-2 2-2zM7 11.8a4.8 4.8 0 0 1-4-2.147C3.02 8.327 5.667 7.6 7 7.6c1.327 0 3.98.727 4 2.053A4.8 4.8 0 0 1 7 11.8z"
              ></path>
            </svg>
            <span>Profile</span>
          </div>
        </Link>
        <div class="dropdown-divider"></div>

        <Link className="dropdown-item" to="/orders">
          <div className="dropdown-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              class=""
              viewBox="0 0 16 12"
            >
              <g fill="none" fill-rule="evenodd">
                <path
                  fill="#2874F1"
                  d="M6.038 11.682h8.407c.565 0 1.018-.38 1.13-.855V.847H.426v9.98c0 .475.452.855 1.017.855h2.232v-2.98H1.94L4.776 6l2.996 2.703H6.038v2.98z"
                ></path>
              </g>
            </svg>
            <span>Orders</span>
          </div>
        </Link>

        <div class="dropdown-divider"></div>
          <Link className="dropdown-item" href="#">
            <div className="dropdown-icon">
              <Dashboard />
              <span>Dashboard</span>
            </div>
          </Link>
          
          <div class="dropdown-divider"></div>
          <div
            style={{ cursor: "pointer" }}
            className="dropdown-item"
            onClick={() => Logout()}
          >
            <div className="dropdown-icon">
              <svg
                width="32"
                height="32"
                class=""
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#2874F0"
                  stroke-width="0.3"
                  stroke="#2874F0"
                  d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"
                ></path>
              </svg>
              <span>LogOut</span>
            </div>
          </div>
        </div>
    </li>
  );
}
