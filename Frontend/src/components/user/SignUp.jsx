import FaceIcon from "@mui/icons-material/Face";
import profile_image_icon from "../../images/Profile.png";
import React, { useState } from "react";
import "./signUp.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch, useSelector } from "react-redux";
import { cleanError, userSignUp } from "../../action-creater/userActionCreater";
import Loader from "../layout/Loader/Loader";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User_CLEAN_ERROR } from "../../constants/authenticationConstants";
import MetaData from "../MetaData";
import Toast from "../../Toast";

function SignUp() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [avatar, setAvatar] = useState();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState();
  let [name, setName] = useState();
  let { loading, isAuthenticated, err } = useSelector(function (state) {
    return state.login;
  });

  useEffect(
    function () {
      if (err) {
        Toast(err, "error");
        dispatch(cleanError(User_CLEAN_ERROR));
      }

      if (isAuthenticated) {
        navigate("/account");
      }
    },
    [err, isAuthenticated]
  );

  function signupSubmit(event) {
    event.preventDefault();
    dispatch(userSignUp(name, email, password, avatar));
  }

  if (loading) {
    return <Loader></Loader>;
  } else {
    return (
      <div className="signup-container">
        <MetaData title={"ShopKaro Sign Up"}></MetaData>
        <div className="signup-box card">
          <form className="signup-form">
            <div class="form-floating">
              <input
                type="text"
                class="form-control"
                id="floatingName"
                placeholder="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required={true}
              />
              <label for="floatingName">Name</label>
            </div>

            <div class="form-floating">
              <input
                type="email"
                class="form-control"
                id="floatingEmail"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email"
                required={true}
              />
              <label id="floatingEmail" for="floatingEmail">
                Email
              </label>
            </div>
            <div class="form-floating">
              <input
                type="password"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required={true}
              />
              <label for="floatingPassword">Password</label>
            </div>
            <div class="mb-3">
              <label for="formFile" class="form-label">
                Profile Image
              </label>
              <input
                class="form-control"
                type="file"
                id="formFile"
                accept="image/*"
                onChange={(event) => setAvatar(event.target.files[0])}
              />
            </div>
            <div className="signup-btn">
              <button
                className="btn btn-primary w-100 btn-lg"
                onClick={signupSubmit}
              >
                SIGN UP
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
