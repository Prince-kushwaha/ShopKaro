import React, { useState, useEffect } from "react";
import "./changePassword.css";
import {
  changePassword,
  cleanError,
  updateReset,
} from "../../action-creater/userActionCreater";
import "./ProfileUpdate.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import KeyIcon from "@mui/icons-material/Key";
import Loader from "../layout/Loader/Loader";
import {
  USER_CHANGEPASSWORD_ErrorClean,
  USER_CHANGEPASSWORD_RESET,
} from "../../constants/authenticationConstants";

function ChangePassword() {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let { isUpdate, loading, err } = useSelector(function(state) {
    return state.changePassword;
  });

  let [passwords, setPasswords] = useState({});

  useEffect(
    function() {
      if (isUpdate) {
        alert("update is successfull");
        dispatch(updateReset(USER_CHANGEPASSWORD_RESET));
        navigate("/account");
      }

      if (err) {
        alert(err.error);
        dispatch(cleanError(USER_CHANGEPASSWORD_ErrorClean));
      }
    },
    [isUpdate, err]
  );

  function handleDataChange(e) {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  }

  function handleUpdateSubmit() {
    dispatch(changePassword(passwords));
  }

  if (loading) {
    return <Loader></Loader>;
  } else {
    return (
      <div className="loginSignUpContainer">
        <div className="loginSignUpBox">
          <h3>Update Password</h3>
          <form className="signUp-form signUpForm">
            <div className="password-box">
              <KeyIcon />
              <input
                type="password"
                name="oldpassword"
                placeholder="Old Password"
                onChange={handleDataChange}
              />
            </div>
            <div className="password-box">
              <LockOpenIcon />
              <input
                type="password"
                name="password"
                placeholder="New Password"
                onChange={handleDataChange}
              />
            </div>
            <div className="password-box">
              <LockOutlinedIcon />
              <input
                type="password"
                name="confirmpassword"
                placeholder="Confirm Password"
                onChange={handleDataChange}
              />
            </div>
            <input
              type="submit"
              onClick={(e) => handleUpdateSubmit(e)}
              value="Update"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default ChangePassword;
