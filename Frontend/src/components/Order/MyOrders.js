import Toast from "../../Toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getMyOrders } from "../../action-creater/orderActionCreater";
import Loader from "../layout/Loader/Loader";
import "./myOrders.css";
import axios from "axios";
import MetaData from "./../MetaData";

function Order({ order }) {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [product, setProduct] = useState(undefined);
  function handleClickOnProduct() {
    let url = "/order/" + order._id;
    navigate(url);
  }

  useEffect(() => {
    try {
      (async function () {
        let { data } = await axios.get(
          "/api/v1/product/" + order.orderItems[0].id
        );
        setProduct(data.product);
      })();
    } catch (error) {
      Toast(error.data);
    }
  }, []);

  if (!product) {
    return (
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    );
  } else {
    return (
      <section className="order-card card mb-3" onClick={handleClickOnProduct}>
        <div className="">
          <div className="order-product-image">
            <img src={product.images[0].url} />
          </div>
          <div className="highlights">
            <p>{order.orderItems[0].name.substr(0, 80)}</p>
          </div>
          <div className="price">
            <span>₹{order.orderItems[0].price}</span>
          </div>
          <div className="order-status text-center">
            <h6>{order.orderStatus}</h6>
          </div>
        </div>
      </section>
    );
  }
}

function MyOrders() {
  let dispatch = useDispatch();

  let { loading, orders, err } = useSelector(function (state) {
    return state.myOrders;
  });

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  useEffect(() => {
    if (err) {
      Toast(err, "error");
    }
  }, [err]);

  if (loading) {
    return (
      <>
        <Loader />
        <MetaData title="Your Order" />
      </>
    );
  } else {
    return (
      <div className="my-orders-container">
        {orders && orders.map((order) => <Order order={order} />)}
      </div>
    );
  }
}

export default MyOrders;
