const {
  paymentProcess,
  sendStripeApiKey,
} = require("../controllers/paymentController");
const { isAuthenticatedUser } = require("../middleware/auth");

const express = require("express");
const router = express.Router();

router.route("/payment/process").post(isAuthenticatedUser, paymentProcess);
router.route("/stripeapikey").get(sendStripeApiKey);

module.exports = router;
