import React, { Fragment } from "react";
import "./Home.css";
import Product from "./Product Card/Product";
import MetaData from "../MetaData";
import { getProducts } from "../../action-creater/productsActionCreater";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import { useParams } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  let params = useParams();

  let { products, loading, error } = useSelector(function(state) {
    return state.products;
  });

  useEffect(
    function() {
      // if (error) return alert(error);
      dispatch(getProducts());
    },
    [dispatch, error]
  );

  if (loading === false) {
    return (
      <Fragment>
        <MetaData title="ShopKaro" />
        <div className="home">
          {products &&
            products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <MetaData title="ShopKaro" />
        <Loader />
      </Fragment>
    );
  }
}

export default Home;
