import React from "react";
import Login from "../user/Login";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function RequireAuth({ children }) {
  let { isAuthenticated, loading } = useSelector(function(state) {
    return state.login;
  });

  if (!loading) {
    if (isAuthenticated) {
      return children;
    } else {
      return <Login />;
    }
  } else {
    return <Loader></Loader>;
  }
}

export default RequireAuth;
