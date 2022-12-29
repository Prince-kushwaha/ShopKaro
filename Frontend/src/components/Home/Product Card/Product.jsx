import "./Product.css";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import React from "react";
function Product(info) {
  let { product } = info;
  return (
    <Link to={`/product/${product._id}`}>
      <div className="productCard card">
        <Image
          cloudName="dfnxst9tf"
          publicId="https://res.cloudinary.com/dfnxst9tf/image/upload/v1667565273/productsImage/2shoe_ij5sm4.jpg"
        ></Image>
        <p>{product.name}</p>
        <StarRatings
          rating={product.rating}
          starRatedColor="gold"
          numberOfStars={6}
          starDimension="15px"
          starSpacing="5px"
          name="rating"
          starHoverColor="gold"
        />
        <p className="text-red">₹{product.price} </p>
      </div>
    </Link>
  );
}

export default Product;
