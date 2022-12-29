const catchAsyncError = require("../middleware/catchAsyncError");
let stripe = require("stripe");
stripe = stripe(process.env.STRIPE_SECRET_KEY);

let paymentProcess = catchAsyncError(async function (req, resp, next) {
  let payment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      campany: "Ecommerce",
    },
  });

  resp.status(200).json({
    success: true,
    client_secret: payment.client_secret,
  });
});

let sendStripeApiKey = function (req, resp, nex) {
  resp.status(200).json({
    stripeApikey: process.env.STRIPE_API_KEY,
  });
};

module.exports.paymentProcess = paymentProcess;
module.exports.sendStripeApiKey = sendStripeApiKey;
