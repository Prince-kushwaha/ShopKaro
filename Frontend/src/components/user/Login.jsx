import React, { useState, useRef, useEffect } from "react";
import "./Login.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch, useSelector } from "react-redux";
import { cleanError, userLogin } from "../../action-creater/userActionCreater";
import Loader from "../layout/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { User_CLEAN_ERROR } from "../../constants/authenticationConstants";
import MetaData from "../MetaData";
import { Link } from "react-router-dom";
import toast from "../../Toast";
import websiteIcon from "../../images/favicon.png";
function Login() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let { loading, err, isAuthenticated } = useSelector(function (state) {
    return state.login;
  });

  useEffect(
    function () {
      if (err) {
        toast(err, "error");
        dispatch(cleanError(User_CLEAN_ERROR));
      }

      if (isAuthenticated) {
        navigate("/home");
      }
    },

    [err, isAuthenticated]
  );

  function loginSubmit(event) {
    event.preventDefault();
    dispatch(userLogin(email, password));
  }

  if (loading) {
    return <Loader></Loader>;
  } else {
    return (
      <div className="login-container">
        <MetaData title={"ShopKaro Sign In"}></MetaData>
        <div className="login-box card">
          <form className="login-form" encType="">
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                id="floatingInput"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
              />
              <label for="floatingInput">Email</label>
            </div>
            <div class="form-floating">
              <input
                type="password"
                class="form-control"
                id="floatingPassword"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
              />
              <label for="floatingPassword">Password</label>
            </div>
            <div className="login-btn">
              <button
                className="btn btn-primary w-100 btn-lg"
                onClick={(e) => loginSubmit(e)}
              >
                Login
              </button>
            </div>
          </form>
          <div className="flex">
            <Link to="/password/forget">Forgot password?</Link>
            <Link to="/sign"> Create account</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;

          // <div className="d-flex">
          //   <h5 style={{ textAlign: "center" }}>ShopKaro</h5>
          //   <img
          //     style={{ objectFit: "contain", width: 50 }}
          //     src={websiteIcon}
          //   />
          // </div>;
