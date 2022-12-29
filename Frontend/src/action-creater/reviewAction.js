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

export function getAllReview(productId) {
  return async function(dispatch) {
    try {
      dispatch({ type: Get_Reviews_Request });
      let { data } = axios.get("/api/v1/reviews");
      dispatch({ type: Get_Reviews_Success, payload: data.reviews });
    } catch (error) {
      dispatch({ type: Get_Reviews_Fail, error: error.response.data });
    }
  };
}

export function createReview(reviewInfo) {
  return async function(dispatch) {
    try {
      dispatch({ type: Create_Review_Request });
      let { data } = axios.post("/api/v1/reviews", reviewInfo);
      dispatch({ type: Create_Review_Success, payload: data.reviews });
    } catch (error) {
      dispatch({ type: Create_Review_Fail, error: error.response.data });
    }
  };
}
