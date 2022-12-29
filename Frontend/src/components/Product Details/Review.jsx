import Profile from "../../images/Profile.png";
import React from "react";
import StarRatings from "react-star-ratings";
import { useSelector } from "react-redux";

function Review(props) {
  let { productDetail } = props;
  return (
    <div className="review card">
      <img src={Profile} alt="profile"></img>
      <StarRatings
        rating={4}
        starRatedColor="gold"
        numberOfStars={6}
        starDimension="15px"
        starSpacing="5px"
        name="rating"
        starHoverColor="gold"
      />
      <p>{productDetail.name}</p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam provident
        consectetur veniam necessitatibus, inventore nulla sequi voluptates a.
        Consequatur incidunt mollitia voluptas, in et ducimus vitae unde
        pariatur impedit voluptatum, saepe quae eum quibusdam! Enim temporibus
      </p>
    </div>
  );
}

export default Review;
