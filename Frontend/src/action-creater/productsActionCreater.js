import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  CLEAN_ERROR,
} from "../constants/productConstants";

import axios from "axios";

export const getProducts = function (
  keyword = "",
  currentPage = 1,
  price = [0, 1000000],
  rating = 0
) {
  return async function (distach) {
    try {
      distach({
        type: ALL_PRODUCT_REQUEST,
      });

      let link =
        "/api/v1/products?" +
        `keyword=${keyword}` +
        `&page=${currentPage}` +
        `&max_price=${price[1]}&min_price=${price[0]}`;

      if (rating > 0) {
        link = link + `&rating=${rating}`;
      }

      const products = await axios.get(link);

      distach({
        type: ALL_PRODUCT_SUCCESS,
        payload: products.data,
      });
    } catch (error) {
      distach({
        type: ALL_PRODUCT_FAIL,
        payload: error.response.data,
      });
    }
  };
};

export const getProductDetail = function (_id) {
  return async function (distach) {
    try {
      distach({
        type: PRODUCT_DETAILS_REQUEST,
      });

      const product = await axios.get(`/api/v1/product/${_id}`);

      distach({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: product.data.product,
      });
    } catch (error) {
      distach({
        type: PRODUCT_DETAILS_FAIL,
        payload: error.response.data,
      });
    }
  };
};

export const clearError = function () {
  return function (distach) {
    distach({
      type: CLEAN_ERROR,
    });
  };
};
