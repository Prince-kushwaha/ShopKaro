import React, { Fragment, useState } from "react";
import "./Search.css";
import Product from "../Home/Product Card/Product";
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
  let [price, setPrice] = useState([0, 25000]);
  let [category, setCategory] = useState("");
  let [rating, setRating] = useState(0);
  let productCategory = ["Laptop", "mobile", "watch"];
  let productRating = [1, 2, 3, 4, 5];

  let { products, loading, error, resultPerPage, productCount } = useSelector(
    function(state) {
      return state.products;
    }
  );

  useEffect(
    function() {
      dispatch(getProducts(keyword, currentPage, price, category, rating));
    },
    [dispatch, keyword, currentPage, price, category, rating]
  );

  function setCurrentPageNumber(e) {
    setCurrentPage(e);
  }

  function setPriceRangeOfProduct(value) {
    return function() {
      setPrice(value);
    };
  }

  function setProductCategory(value) {
    return function() {
      setCategory(value);
    };
  }

  function setProductRating(value) {
    return function() {
      setRating(value);
    };
  }

  if (loading === false) {
    return (
      <Fragment>
        <div className="search">
          <MetaData title={"ShopKaro : " + keyword}></MetaData>
          <div className="products">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
          <div className="filter-box">
            <div className="price-box">
              <h3>Price</h3>
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
            <div className="category-box">
              <h3>Category</h3>
              <ul>
                {productCategory.map(function(value) {
                  return <li onClick={setProductCategory(value)}>{value} </li>;
                })}
              </ul>
            </div>
            <div className="rating-box">
              <h3>Rating</h3>
              {productRating.map(function(rating) {
                return (
                  <li onClick={setProductRating(rating)}>
                    <StarRatings
                      rating={rating}
                      starRatedColor="gold"
                      numberOfStars={6}
                      starDimension={1 + "rem"}
                      starSpacing={0.3 + "rem"}
                      name="rating"
                      starHoverColor="gold"
                    />
                  </li>
                );
              })}
            </div>
          </div>
        </div>
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
      </Fragment>
    );
  } else {
    return <Loader />;
  }
}

export default Search;
