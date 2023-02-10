import React, { Fragment, useState } from "react";
import "./Search.css";
import Product from "./Product";
import { getProducts } from "../../action-creater/productsActionCreater";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import StarRatings from "react-star-ratings";
import MetaData from "../MetaData";
function Search() {
  const dispatch = useDispatch();
  let { keyword } = useParams();
  let [currentPage, setCurrentPage] = useState(1);
  let [price, setPrice] = useState([0, 1000000]);
  let [rating, setRating] = useState(0);
  let productRating = [1, 2, 3, 4, 5];
  let [discount, setDiscount] = useState([1, 100]);
  let [availability, setAvailability] = useState(false);
  let { products, loading, error, resultPerPage, productCount } = useSelector(
    function (state) {
      return state.products;
    }
  );

  useEffect(
    function () {
      dispatch(getProducts(keyword, currentPage, price, rating));
    },
    [dispatch, keyword, currentPage, price, rating]
  );

  function setCurrentPageNumber(e) {
    setCurrentPage(e);
  }

  function setPriceRangeOfProduct(value) {
    return function () {
      setPrice(value);
    };
  }

  function setProductRating(value) {
    return function () {
      setRating(value);
    };
  }

  function setDiscountRangeOfProduct(value) {
    return function () {
      setDiscount(value);
    };
  }

  function setAvailabilityOfProduct(value) {
    return function () {
      setAvailability(!value);
    };
  }

  if (loading === false) {
    return (
      <Fragment>
        <div className="search">
          <MetaData title={"ShopKaro : " + keyword}></MetaData>
          <div className="filter-box card">
            <div className="price-box">
              <h6>Price</h6>
              <ul>
                <li onClick={setPriceRangeOfProduct([0, 999])}>Under ₹1,000</li>
                <li onClick={setPriceRangeOfProduct([1000, 5000])}>
                  ₹1,000 - ₹5,000
                </li>
                <li onClick={setPriceRangeOfProduct([10000, 20000])}>
                  ₹10,000 - ₹20,000
                </li>
                <li onClick={setPriceRangeOfProduct([20000, 50000])}>
                  Over ₹20,000
                </li>
              </ul>
            </div>
            <div className="rating-box">
              <h6>Rating</h6>
              <ul>
                {productRating.map(function (rating) {
                  return (
                    <li onClick={setProductRating(rating)}>
                      <StarRatings
                        rating={rating}
                        starRatedColor="gold"
                        numberOfStars={6}
                        starDimension={1 + "rem"}
                        name="rating"
                        starSpacing={0 + "px"}
                        starHoverColor={"lightblue"}
                      />
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="discount-box">
              <h6>Discount</h6>
              <ul>
                <li onClick={setDiscountRangeOfProduct([40, 100])}>
                  40% or more
                </li>
                <li onClick={setDiscountRangeOfProduct([30, 100])}>
                  30% or more
                </li>
                <li onClick={setDiscountRangeOfProduct([20, 100])}>
                  20% or more
                </li>
                <li onClick={setDiscountRangeOfProduct([10, 100])}>
                  10% or more
                </li>
              </ul>
            </div>
            <div className="availability-box">
              <h6>Availability</h6>
              <ul>
                <li onClick={setAvailabilityOfProduct(availability)}>
                  Include Out of Stock
                </li>
              </ul>
            </div>
          </div>
          <div className="products">
            {products.map((product) => (
              <Product key={product._id} info={product} />
            ))}
          </div>
        </div>

        {productCount > resultPerPage && (
          <div className="pagination-box">
            <Pagination
              itemsCountPerPage={resultPerPage}
              firstPageText="1st"
              nextPageText="NEXT"
              activePage={currentPage}
              totalItemsCount={productCount}
              onChange={setCurrentPageNumber}
              lastPageText="Last"
              prevPageText="PREV"
              itemClass="page-item"
              linkClass="page-link"
              activeClass="page-activeItem"
              activeLinkClass="page-activeLink"
            ></Pagination>
          </div>
        )}
      </Fragment>
    );
  } else {
    return <Loader />;
  }
}

export default Search;
