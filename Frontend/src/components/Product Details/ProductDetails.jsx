import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductDetail } from "../../action-creater/productsActionCreater";
import image from "../../images/productImages/top1.jpg";
import Loader from "../../components/layout/Loader/Loader";
import StarRatings from "react-star-ratings";
import Review from "./Review";
import { Image } from "cloudinary-react";
import "./productDetails.css";
import "react-slideshow-image/dist/styles.css";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import { addCartItemAction } from "../../action-creater/cartActionCreater";
import MetaData from "../MetaData";

function ProductDetails() {
  const { id } = useParams();
  let dispatch = useDispatch();
  let [quantity, setQuantity] = useState(1);

  let { loading, error, productDetail: product } = useSelector(function(state) {
    return state.productDetail;
  });

  useEffect(
    function() {
      dispatch(getProductDetail(id));
    },
    [dispatch, id]
  );

  function handleAddToCart() {
    dispatch(addCartItemAction(id, quantity));
  }

  var images = [image, image];
  if (loading === false) {
    return (
      <div className="product-card card">
        <MetaData title={"ShopKaro : " + product.name}></MetaData>
        <div className="product-details">
          <div className="product-images">
            <AwesomeSlider>
              {images.map(function() {
                return (
                  <div>
                    <Image
                      className="carousel-image"
                      cloudName="dfnxst9tf"
                      publicId="https://res.cloudinary.com/dfnxst9tf/image/upload/v1667565273/productsImage/2shoe_ij5sm4.jpg"
                    ></Image>
                  </div>
                );
              })}
            </AwesomeSlider>
          </div>
          <div className="product-detail">
            <div className="detailBlock-1">
              <h3>{product.name}</h3>
              <p>{`Product # ${product._id}`}</p>
              <hr />
            </div>
            <div className="detailBlock-2">
              <StarRatings
                rating={product.rating}
                starRatedColor="gold"
                numberOfStars={6}
                starDimension={1 + "rem"}
                starSpacing={0.3 + "rem"}
                name="rating"
                starHoverColor="gold"
              />
              <span>{`(${product.numOfRating} review)`}</span>
            </div>
            <hr />
            <div className="detailBlock-3">
              <h3>₹{product.price}</h3>
              <div className="btn">
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                >
                  -
                </button>
                <input type="number" value={quantity} />
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
                <input
                  type="button"
                  onClick={handleAddToCart}
                  value="Add to Cart"
                />
              </div>
            </div>
            <hr />
            <p>
              Status:
              <span className={product.stock > 0 ? "text-green" : "text-red"}>
                {product.stock > 0 ? "InStock" : "OutStock"}
              </span>
            </p>
            <hr />
            <div className="detailBlock-4">
              <h3>Description</h3>
              <p>{product.description}</p>
              <button>Submit Review</button>
            </div>
          </div>
        </div>

        <div className="product-reviews">
          <h2>Reviews</h2>
          <div className="reviews">
            {product.reviews && product.reviews.length == 0 ? (
              <h2>No Review Yest</h2>
            ) : (
              <Review productDetail={product} />
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return <Loader />;
  }
}

export default ProductDetails;
