import React, { useState, useRef, useEffect } from "react";
import "./Login.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cleanError, userLogin } from "../../action-creater/userActionCreater";
import Loader from "../layout/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { User_CLEAN_ERROR } from "../../constants/authenticationConstants";
import MetaData from "../MetaData";
function Login() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { loading, err, isAuthenticated } = useSelector(function(state) {
    return state.login;
  });

  useEffect(
    function() {
      if (err) {
        dispatch(cleanError(User_CLEAN_ERROR));
        alert(err);
      }

      if (isAuthenticated) {
        navigate("/account");
      }
    },

    [err, isAuthenticated]
  );

  let [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  function loginDataChange(event) {
    let { name, value } = event.target;
    loginData[name] = value;
    setLoginData(loginData);
  }

  function loginSubmit(event) {
    event.preventDefault();
    let { email, password } = loginData;
    dispatch(userLogin(email, password));
  }

  if (loading) {
    return <Loader></Loader>;
  } else {
    return (
      <div className="loginSignUpContainer">
        <MetaData title={"ShopKaro Sign In"}></MetaData>
        <div className="loginSignUpBox">
          <h3>Login</h3>
          <form className="login-form" encType="">
            <div className="email-box">
              <MailOutlineIcon />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={loginDataChange}
              />
            </div>
            <div className="password-box">
              <LockOutlinedIcon />
              <input
                type="password"
                name="password"
                id=""
                placeholder="Password"
                onChange={loginDataChange}
              />
            </div>
            <Link to="/password/forget">Forget Password ?</Link>
            <input
              type="submit"
              onClick={(e) => loginSubmit(e)}
              value="Login"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
