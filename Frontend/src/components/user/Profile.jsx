import React from "react";
import "./Profile.css";
import profileIcon from "../../images/Appstore.png";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Profile() {
  let { user } = useSelector(function(state) {
    return state.login;
  });
  
  return (
    <div className="profile">
      <div className="profile-image">
        <img src={user.avatar.url}></img>
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
