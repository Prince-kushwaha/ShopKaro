import axios from "axios";
import {
  Create_Review_Fail,
  Create_Review_Request,
  Create_Review_Success,
  Review_CleanError,
  Get_Reviews_Fail,
  Get_Reviews_Success,
  Get_Reviews_Request,
} from "../constants/reviewConstants";

export function CreateReviewReducer(state = {}, action) {
  switch (action.type) {
    case Create_Review_Request:
      return {
        loading: true,
      };
    case Create_Review_Fail:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Create_Review_Success:
      return {
        ...state,
        loading: false,
        review: action.payload,
      };
    default:
      return state;
  }
}


