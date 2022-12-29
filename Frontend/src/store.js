import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import productReducer, {
  productDetailReducer,
} from "./reducer/productsReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  LoginReducer,
  updateProfileReducer,
  changePasswordReducer,
} from "./reducer/authenticationReducer";
import { forgetPasswordReducer } from "./reducer/authenticationReducer";
import { cartReducer } from "./reducer/cartReducer";
import newOrderReducer from "./reducer/newOrderReducer";
import OrderReducer, { OrderDetailReducer } from "./reducer/orderReducer";
import { CreateReviewReducer } from "./reducer/reviewReducer";

let reducer = combineReducers({
  products: productReducer,
  productDetail: productDetailReducer,
  login: LoginReducer,
  updateProfile: updateProfileReducer,
  changePassword: changePasswordReducer,
  forgetPassword: forgetPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: OrderReducer,
  orderDetails: OrderDetailReducer,
  review: CreateReviewReducer,
});

let cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
let shippingInfo = localStorage.getItem("shippingInfo")
  ? JSON.parse(localStorage.getItem("shippingInfo"))
  : {};

let initialState = {
  cart: {
    cartItems,
    shippingInfo,
  },
};

let middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
