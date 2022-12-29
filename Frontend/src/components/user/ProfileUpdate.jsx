import FaceIcon from "@mui/icons-material/Face";
import ProfileIcon from "../../images/Profile.png";
import React, { useState } from "react";
import "./ProfileUpdate.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import {
  loadUser,
  updateProfile,
  cleanError,
  updateReset,
} from "../../action-creater/userActionCreater";
import Loader from "../layout/Loader/Loader";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  UpdateProfile_ErrorClean,
  USER_UpdateProfile_RESET,
} from "../../constants/authenticationConstants";

function UpdateProfile() {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { user } = useSelector(function(state) {
    return state.login;
  });

  let ProfileImage = user.avatar ? user.avatar.url : ProfileIcon;
  const [avatar, setAvatar] = useState();
  let [avatarPreview, setAvatarPreview] = useState(ProfileImage);

  let { loading, isUpdate, err } = useSelector(function(state) {
    return state.updateProfile;
  });

  let [userInfo, setUserInfo] = useState({
    name: user.name,
    email: user.email,
  });

  function handledataChange(event) {
    let { name, value, type } = event.target;
    if (type === "file") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
          setAvatarPreview(reader.result);
        }
      };

      reader.readAsDataURL(event.target.files[0]);
    } else {
      setUserInfo({ ...userInfo, [name]: value });
    }
  }

  function updateProfileSubmit(event) {
    event.preventDefault();
    let { email, name } = userInfo;
    let formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    if (avatar) formData.set("avatar", avatar);
    dispatch(updateProfile(formData));
  }

  useEffect(
    function() {
      if (isUpdate) {
        dispatch(loadUser());
        alert("Profile update");
        navigate("/account");
        dispatch(updateReset(USER_UpdateProfile_RESET));
      }

      if (err) {
        alert("profile not update error:" + err.error);
        dispatch(cleanError(UpdateProfile_ErrorClean));
      }
    },
    [isUpdate, err]
  );

  if (loading) {
    return <Loader></Loader>;
  } else {
    return (
      <div className="loginSignUpContainer">
        <div className="loginSignUpBox">
          <h3>Update Profile</h3>
          <form className="signUp-form signUpForm">
            <div className="name-box">
              <FaceIcon />
              <input
                type="text"
                value={userInfo.name}
                name="name"
                id="name"
                onChange={handledataChange}
              />
            </div>
            <div className="sign-email-box">
              <MailOutlineIcon />
              <input
                type="email"
                value={userInfo.email}
                name="email"
                onChange={handledataChange}
              />
            </div>
            <div className="sign-profileImage">
              <img src={avatarPreview}></img>
              <input
                type="file"
                accept="image/*"
                placeholder="Profile Image"
                name="avatar"
                onChange={handledataChange}
              />
            </div>
            <input
              type="submit"
              onClick={(e) => updateProfileSubmit(e)}
              value="Update Profile"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default UpdateProfile;
