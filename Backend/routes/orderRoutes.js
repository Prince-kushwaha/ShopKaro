const express = require("express");
const router = express.Router();
const {
  createOrder,
  myOrders,
  getUserOrdersByAdmin,
  updateOrderStatus,
  getSingleOrder,
  getSingleOrderByAdmin,
  deleteOrder,
} = require("../controllers/orderController");

const { isAuthenticatedUser, isAdmin } = require("../middleware/auth");

router.route("/order/new").post(isAuthenticatedUser, createOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router.route("/order/me/:id").get(isAuthenticatedUser, getSingleOrder);

router
  .route("/admin/orders/")
  .get(isAuthenticatedUser, isAdmin, getUserOrdersByAdmin);

router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, isAdmin, updateOrderStatus)
  .get(isAuthenticatedUser, isAdmin, getSingleOrderByAdmin)
  .delete(isAuthenticatedUser, isAdmin, deleteOrder);

module.exports = router;
