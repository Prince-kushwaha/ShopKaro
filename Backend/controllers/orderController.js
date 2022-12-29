const catchAsyncError = require("../middleware/catchAsyncError");
const Order = require("../models/orderModel");
const Product = require("../models/productSchema");
const ErrorHandler = require("../utils/errorHandler");

exports.createOrder = catchAsyncError(async function (req, resp, next) {
  const user = req.user._id;
  let orderInfo = req.body;
  orderInfo.user = user;
  orderInfo.shippingInfo.name = req.user.name;
  orderInfo.deliveryAt = Date.now() + 10000000;
  for (let i = 0; i < orderInfo.orderItems.length; i++)
    orderInfo.orderItems[i].product = orderInfo.orderItems[i]._id;
  let isproductInStack = true;

  orderInfo.orderItems.forEach(async function checkStack(item) {
    let product = await Product.findById(item._id);
    if (product.stock < item.quantity) {
      isproductInStack = false;
    }
  });

  if (!isproductInStack) {
    return next(new ErrorHandler(404, "product is not in stack"));
  }

  const order = await Order.create(orderInfo);
  resp.status(201).json({
    success: true,
    order,
  });
});

// get All user order
exports.myOrders = catchAsyncError(async function (req, resp, next) {
  const userId = req.user._id;
  const orders = await Order.find({ user: userId });

  resp.status(200).json({
    success: true,
    orders,
  });
});

exports.getUserOrdersByAdmin = catchAsyncError(async function (
  req,
  resp,
  next
) {
  const userId = req.query.user;
  let products = await Order.find({ user: userId });
  resp.status(200).json({
    success: true,
    products,
  });
});

// update Order status --Admin
exports.updateOrderStatus = catchAsyncError(async function (req, resp, next) {
  const orderId = req.params.id;
  const status = req.body.status;

  let order = await Order.findById(orderId);
  order.orderStatus = status || order.orderStatus;
  order = await order.save();

  resp.status(200).json({
    success: true,
    order,
  });
});

exports.getSingleOrder = catchAsyncError(async function (req, resp, next) {
  const orderid = req.params.id;
  const order = await Order.findById(orderid);

  if (!order) {
    return next(new ErrorHandler(404, "order does not exist"));
  }

  if (req.user._id.toString() !== order.user.toString()) {
    return next(new ErrorHandler(403, "you can not acess this resource"));
  }

  resp.status(200).json({
    success: true,
    order,
  });
});

// get single order --Admin
exports.getSingleOrderByAdmin = catchAsyncError(async function (
  req,
  resp,
  next
) {
  const orderid = req.params.id;
  const order = await Order.findById(orderid).populate("user", "name email");

  if (!order) {
    return next(new ErrorHandler(404, "order does not exist"));
  }

  resp.status(200).json({
    success: true,
    order,
  });
});

// delete Order by Admin
exports.deleteOrder = catchAsyncError(async function (req, resp, next) {
  const orderId = req.params.id;
  const order = await Order.findById(orderId);
  if (!order) {
    return next(new ErrorHandler(204, "order not exist"));
  }

  await order.remove();
  resp.status(200).json({
    success: true,
  });
});
