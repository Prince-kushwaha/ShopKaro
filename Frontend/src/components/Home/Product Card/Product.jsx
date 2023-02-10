import "./Product.css";
import React from "react";
import { useNavigate } from "react-router-dom";

function Product({ info }) {
  let navigate = useNavigate();

  let { name, images, category, price, stock, discount, rating } = info;
  discount = discount || 100;
  let Offer = price - Math.round((price / 100) * discount);
  let productRating = [];
  for (let i = 0; i < rating; i++) {
    productRating.push(<i class="fa fa-star"></i>);
  }

  function handleClickOnProduct() {
    let url = "/product/" + info._id;
    navigate(url);
  }

  return (
    <div
      style={{ cursor: "pointer" }}
      class="col-md-12 col-lg-4 mb-4 mb-lg-0"
      onClick={handleClickOnProduct}
    >
      <div class="card">
        <div class="d-flex justify-content-between p-3">
          <p class="lead mb-0">Today's Combo Offer</p>
          <div
            class="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
            style={{ width: 35, height: 35 }}
          >
            <p class="text-white mb-0 small">x4</p>
          </div>
        </div>
        <img src={images[0].url} class="card-img-top" alt={category} />
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <p class="small">
              <a href="#!" class="text-muted">
                {category}
              </a>
            </p>
            <p class="small text-danger">
              <s>₹{price}</s>
            </p>
          </div>
          <div class="d-flex justify-content-between mb-3">
            <h5 class="mb-0">{name.substring(0, 15)}</h5>
            <h5 class="text-dark mb-0">₹{Offer}</h5>
          </div>
          <div class="d-flex justify-content-between mb-2">
            <p class="text-muted mb-0">
              Available: <span class="fw-bold">{stock}</span>
            </p>
            <div class="ms-auto text-warning">{productRating}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
