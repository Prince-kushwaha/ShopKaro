import axios from "axios";
import {
  Create_Review_Fail,
  Create_Review_Request,
  Create_Review_Success,
} from "../constants/reviewConstants";

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
