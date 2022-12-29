import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_UpdateProfile_REQUEST,
  USER_UpdateProfile_SUCCESS,
  USER_UpdateProfile_FAIL,
  USER_UpdateProfile_RESET,
  USER_CHANGEPASSWORD_SUCCESS,
  USER_CHANGEPASSWORD_FAIL,
  USER_CHANGEPASSWORD_REQUEST,
} from "../constants/authenticationConstants";
import axios from "axios";

export let userLogin = function(email, password) {
  return async function(dispatch) {
    try {
      dispatch({
        type: USER_LOGIN_REQUEST,
      });

      let URL = "/api/v1/user/login";
      let data = {
        email,
        password,
      };

      let response = await axios.post(URL, data);

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        err: error.response.data,
      });
    }
  };
};

export let userSignUp = function(data) {
  return async function(dispatch) {
    try {
      dispatch({
        type: USER_SIGNUP_REQUEST,
      });

      let URL = "/api/v1/user/register";
      let response = await axios.post(URL, data);

      dispatch({
        type: USER_SIGNUP_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: USER_SIGNUP_FAIL,
        err: error.response.data,
      });
    }
  };
};

export let loadUser = function() {
  return async function(dispatch) {
    try {
      dispatch({
        type: LOAD_USER_REQUEST,
      });

      let URL = "/api/v1/user/me";
      let response = await axios.get(URL);

      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: LOAD_USER_FAIL,
        err: error.response.data,
      });
    }
  };
};

export let userLogout = function() {
  return async function(dispatch) {
    try {
      dispatch({
        type: USER_LOGOUT_REQUEST,
      });

      await axios.get("/api/v1/user/logout");
      dispatch({
        type: USER_LOGOUT_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: USER_LOGOUT_FAIL,
      });
    }
  };
};

export let updateProfile = function(userInfo) {
  return async function(dispatch) {
    try {
      dispatch({
        type: USER_UpdateProfile_REQUEST,
      });

      let url = "/api/v1/user/me/update";
      let response = await axios.put(url, userInfo);

      dispatch({
        type: USER_UpdateProfile_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: USER_UpdateProfile_FAIL,
        err: err.response.data,
      });
    }
  };
};

export let cleanError = function(type) {
  return function(dispatch) {
    dispatch({
      type: type,
    });
  };
};

export let updateReset = function(type) {
  return function(dispatch) {
    dispatch({
      type: type,
    });
  };
};

export let changePassword = function(info) {
  return async function(dispatch) {
    try {
      dispatch({
        type: USER_CHANGEPASSWORD_REQUEST,
      });

      let url = "/api/v1/user/me/updatepassword";
      await axios.put(url, info);
      dispatch({
        type: USER_CHANGEPASSWORD_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: USER_CHANGEPASSWORD_FAIL,
        payload: err.response.data,
      });
    }
  };
};

export let forgetPassword = function(info) {
  return async function(dispatch) {};
};

export let cartActionCreater;
