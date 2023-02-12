import React, { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProductDetail } from "../../action-creater/productsActionCreater";
import image from "../../images/productImages/top1.jpg";
import Loader from "../../components/layout/Loader/Loader";
import Review from "./Review";
import "./productDetails.css";
import "react-slideshow-image/dist/styles.css";
import "react-awesome-slider/dist/styles.css";
import { addCartItemAction } from "../../action-creater/cartActionCreater";
import MetaData from "../MetaData";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { processOrderActionCreater } from "../../action-creater/orderActionCreater";

function ProductDetails() {
  const { id } = useParams();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let { loading, error, product } = useSelector(function (state) {
    return state.productDetail;
  });

  useEffect(
    function () {
      dispatch(getProductDetail(id));
    },
    [dispatch, id]
  );

  let [currentImage, setcurrentImage] = useState(undefined);
  function handlebuy() {
    let orderItems = [
      {
        name: product.name,
        quantity: 1,
        image: product.images[0].url,
        id: product._id,
        price: product.price,
        discount: product.discount,
        stock: product.stock,
      },
    ];
    dispatch(processOrderActionCreater({ orderItems }));
    navigate("/checkOut");
  }

  function handleAddToCart() {
    dispatch(
      addCartItemAction(
        product.name,
        product._id,
        product.price,
        product.images[0].url,
        product.stock,
        product.discount,
        1
      )
    );
  }

  useEffect(() => {
    if (product) setcurrentImage(product.images[0].url);
  }, [product]);

  function mouseHoverOnProductSmallImage(event) {
    setcurrentImage(event.target.src);
  }

  if (loading === false && product) {
    return (
      <section className="product-info">
        <div className="row">
          <div className="col-1">
            <div className="card">
              {product.images.map(function (image) {
                return (
                  <div className="card product-small-image">
                    <img
                      className="w-100"
                      onMouseOver={mouseHoverOnProductSmallImage}
                      src={image.url}
                      alt={product.category}
                    ></img>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-5">
            <div className="card">
              <img
                className="product-image"
                alt={product.category}
                src={currentImage}
              ></img>
            </div>
            <div className="btnc-buy-cart">
              <div>
                <button
                  onClick={handleAddToCart}
                  className="btn w-100 btn-warning btn-lg"
                >
                  Add to card
                </button>
              </div>
              <div>
                <button
                  onClick={handlebuy}
                  className="btn w-100 btn-danger btn-lg"
                >
                  Buys
                </button>
              </div>
            </div>
          </div>
          <div className="col-6">
            <p>{product.name}</p>
            <div className="product-rating">
              <div className="star">
                <span>{product.rating}</span>
                <StarBorderIcon />
              </div>
              <span>{product.numOfRating} ratings</span>
            </div>
            <div className="product-prices">
              <p>Extra ₹5,499</p>
              <span>₹{product.price}</span>
              <span>
                ₹{Math.round((product.price / 100) * product.discount)}
              </span>
            </div>
            <div className="product-offer">
              <h5>Available Offer</h5>
              {product.offers.map((offer) => {
                return (
                  <div className="offer-item">
                    <img
                      style={{ width: 18, height: 18 }}
                      alt="icon"
                      src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90"
                    />
                    <li>
                      <span>{offer.type}</span>
                      <p>{offer.info}</p>
                    </li>
                  </div>
                );
              })}
            </div>
            <div className="product-description">
              {product.info.map((value) => (
                <Description
                  type={Object.keys(value)[0]}
                  value={Object.values(value)[0]}
                />
              ))}
            </div>
            <div className="product-specification">
              <h2>Product Specifications</h2>
              {product.specifications.map((info) => (
                <ProductSpecification info={info} />
              ))}
            </div>
            <div className="Ratings & Reviews">
              <h3>Ratings & Reviews</h3>
              {product.reviews.map((review) => (
                <Review info={review} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return <Loader />;
  }
}

export default ProductDetails;

function Description({ type, value }) {
  switch (type) {
    case "HighLights":
      return <Highlights features={value} />;
    default:
      return <div></div>;
  }
}

function Storage() {
  return (
    <div className="storage">
      <p>Storage</p>
      <div className="product-storage">
        <span>8 GB</span>
        <span>16 GB</span>
      </div>
    </div>
  );
}

function Color() {
  return (
    <div className="color">
      <p>Color</p>
      <div className="product-color-images">
        <img src={image} />
        <img src={image} />
      </div>
    </div>
  );
}

function Ram() {
  return (
    <div className="ram">
      <p>Ram</p>
      <div className="product-ram">
        <span>8 GB</span>
        <span>16 GB</span>
      </div>
    </div>
  );
}

function Highlights({ features }) {
  return (
    <div className="Highlights">
      <p>Highlights</p>
      <div className="product-highlights">
        {features.map((value) => (
          <li>{value}</li>
        ))}
      </div>
    </div>
  );
}

function Warrenty() {
  return (
    <div className="warranty">
      <p>Warranty</p>
      <p>
        1 Year Manufacturer Warranty for Phone and 6 Months Warranty for In-Box
        Accessories
      </p>
    </div>
  );
}

function ProductSpecification({ info }) {
  return (
    <div className={info["name"]}>
      <h5>{info["name"]}</h5>
      {Object.entries(info).map(([key, value]) => (
        <Specification name={key} value={value} />
      ))}
    </div>
  );
}

function Specification({ name, value }) {
  return (
    <div className="specification">
      <p>{name}</p>
      <p>{value}</p>
    </div>
  );
}
