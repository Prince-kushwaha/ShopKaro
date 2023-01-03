import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_REQUEST,
  User_CLEAN_ERROR,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_UpdateProfile_FAIL,
  USER_UpdateProfile_REQUEST,
  USER_UpdateProfile_SUCCESS,
  UpdateProfile_ErrorClean,
  USER_UpdateProfile_RESET,
  USER_CHANGEPASSWORD_REQUEST,
  USER_CHANGEPASSWORD_SUCCESS,
  USER_CHANGEPASSWORD_FAIL,
  USER_CHANGEPASSWORD_ErrorClean,
  USER_CHANGEPASSWORD_RESET,
  USER_FORGETASSWORD_RESET,
  USER_FORGETPASSWORD_FAIL,
  USER_FORGETPASSWORD_SUCCESS,
  USER_FORGETPASSWORD_REQUEST,
  USER_FORGETPASSWORD_ErrorClean,
} from "../constants/authenticationConstants";

export let LoginReducer = function(state = { user: {} }, action) {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
    case USER_SIGNUP_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_LOGIN_SUCCESS:
    case USER_SIGNUP_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        isAuthenticated: true,
      };

    case USER_LOGIN_FAIL:
    case USER_SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        err: action.err.error,
        user: null,
        isAuthenticated: false,
      };

    case LOAD_USER_FAIL:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };

    case User_CLEAN_ERROR:
      return {
        loading: false,
        err: null,
        user: null,
        isAuthenticated: false,
      };

    case USER_LOGOUT_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case USER_LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      };

    case USER_LOGOUT_FAIL:
      return {
        loading: false,
        ...state,
        err: "Logout is unsuccessfull",
      };
    default:
      return state;
  }
};

export let updateProfileReducer = function(state = {}, action) {
  switch (action.type) {
    case USER_UpdateProfile_REQUEST:
      return {
        loading: true,
      };

    case USER_UpdateProfile_SUCCESS:
      return {
        loading: false,
        isUpdate: true,
      };

    case USER_UpdateProfile_FAIL:
      return {
        loading: false,
        isUpdate: false,
        err: action.err,
      };
    case UpdateProfile_ErrorClean:
      return {
        ...state,
        err: null,
      };
    case USER_UpdateProfile_RESET:
      return {
        ...state,
        isUpdate: null,
      };
    default:
      return state;
  }
};

export let changePasswordReducer = function(state = {}, action) {
  switch (action.type) {
    case USER_CHANGEPASSWORD_REQUEST:
      return {
        loading: true,
      };

    case USER_CHANGEPASSWORD_SUCCESS:
      return {
        loading: false,
        isUpdate: true,
      };

    case USER_CHANGEPASSWORD_FAIL:
      return {
        loading: false,
        isUpdate: false,
        err: action.payload,
      };

    case USER_CHANGEPASSWORD_RESET:
      return {
        ...state,
        isUpdate: null,
      };

    case USER_CHANGEPASSWORD_ErrorClean:
      return {
        ...state,
        err: null,
      };
    default:
      return state;
  }
};

export let forgetPasswordReducer = function(state = {}, action) {
  switch (action.type) {
    case USER_FORGETPASSWORD_REQUEST:
      return {
        loading: true,
      };
    case USER_FORGETPASSWORD_SUCCESS:
      return {
        loading: false,
        isUpdate: true,
      };

    case USER_FORGETPASSWORD_FAIL:
      return {
        loading: false,
        isUpdate: false,
        err: action.payload.error,
      };

    case USER_FORGETPASSWORD_ErrorClean:
      return {
        loading: false,
        isUpdate: null,
      };

    default:
      return state;
  }
};
