import React from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import profileIcon from "../../images/Profile.png";

function Profile() {
  let { user } = useSelector(function (state) {
    return state.login;
  });

  return (
    <div className="profile">
      <div className="profile-image">
        <img
          alt="profile Image"
          src={(user.avatar && user.avatar.url) || profileIcon}
        ></img>
        <Link to="me/update">Edit Profile</Link>
      </div>
      <div className="profile-details">
        <div>
          <h5>Full Name</h5>
          <p>{user.name}</p>
        </div>
        <div>
          <h5>Email</h5>
          <p>{user.email}</p>
        </div>
        <div>
          <h5>Joined</h5>
          <p>{new Date().getDate()}</p>
        </div>
        <Link to="/orders">My Orders</Link>
        <Link to="me/password">Change Password</Link>
      </div>
    </div>
  );
}
export default Profile;
