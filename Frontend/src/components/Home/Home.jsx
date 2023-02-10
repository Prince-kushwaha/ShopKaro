import React, { Fragment } from "react";
import "./Home.css";
import MetaData from "../MetaData";
import { getProducts } from "../../action-creater/productsActionCreater";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loader from "../layout/Loader/Loader";
import Product from "./Product Card/Product";

function Home() {
  const dispatch = useDispatch();

  let { products, loading, error } = useSelector(function (state) {
    return state.products;
  });

  useEffect(
    function () {
      // if (error) return alert(error);
      dispatch(getProducts());
    },
    [dispatch, error]
  );

  if (loading === false) {
    return (
      <section style={{ backgroundColor: "#eee" }}>
        <div class="container py-5">
          <div class="row">
            {products &&
              products.map((info) => <Product key={info._id} info={info} />)}
          </div>
        </div>
      </section>
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
