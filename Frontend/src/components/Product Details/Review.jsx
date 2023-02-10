import React from "react";
import StarBorderIcon from "@mui/icons-material/StarBorder";

function Review({ info }) {
  let { comment, status, name, rating } = info;
  return (
    <div className="Review card">
      <div>
        <div className="product-rating">
          <div className="star">
            <span>{rating}</span>
            <StarBorderIcon />
          </div>
          <span>{status}</span>
        </div>
        <p>{comment}</p>
      </div>
    </div>
  );
}

export default Review;
