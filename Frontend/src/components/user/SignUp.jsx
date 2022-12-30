import FaceIcon from "@mui/icons-material/Face";
import profile_image_icon from "../../images/Profile.png";
import React, { useState } from "react";
import "./Login.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch, useSelector } from "react-redux";
import { cleanError, userSignUp } from "../../action-creater/userActionCreater";
import Loader from "../layout/Loader/Loader";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User_CLEAN_ERROR } from "../../constants/authenticationConstants";
import MetaData from "../MetaData";

function SignUp() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [avatar, setAvatar] = useState("");
  let [avatarPreview, setAvatarPreview] = useState(profile_image_icon);
  let { loading, isAuthenticated, err } = useSelector(function(state) {
    return state.login;
  });

  let [registrationData, setRegistrationData] = useState({
    name: "",
    email: "",
    password: "",
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

  function registrationDataChange(event) {
    let { name, value, type } = event.target;
    if (type === "file") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(event.target.files[0]);
    } else {
      registrationData[name] = value;
      setRegistrationData(registrationData);
    }
  }

  function SignUpSubmit(event) {
    event.preventDefault();
    let { email, password, name } = registrationData;
    let formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);
    dispatch(userSignUp(formData));
  }

  if (loading) {
    return <Loader></Loader>;
  } else {
    return (
      <div className="loginSignUpContainer">
        <MetaData title={"ShopKaro Sign Up"}></MetaData>
        <div className="loginSignUpBox">
          <form className="signUp-form signUpForm">
            <div className="name-box">
              <FaceIcon />
              <input
                type="text"
                placeholder="Name"
                name="name"
                id="name"
                onChange={registrationDataChange}
              />
            </div>
            <div className="sign-email-box">
              <MailOutlineIcon />
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={registrationDataChange}
              />
            </div>
            <div className="sign-password-box">
              <LockOutlinedIcon />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={registrationDataChange}
              />
            </div>
            <div className="sign-profileImage">
              <img src={avatarPreview}></img>
              <input
                type="file"
                accept="image/*"
                placeholder="Profile Image"
                name="avatar"
                onChange={registrationDataChange}
              />
            </div>
            <input
              type="submit"
              onClick={(e) => SignUpSubmit(e)}
              value="SignUp"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default SignUp;
