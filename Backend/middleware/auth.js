const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const formidable = require("formidable");
const form = formidable({ multiples: true });

const isAuthenticatedUser = catchAsyncError(async function (req, resp, next) {
  const jwtToken = req.cookies.token;

  if (!jwtToken) {
    return next(new ErrorHandler(401, "please login"));
  }

  const _id = await jwt.verify(jwtToken, process.env.JWTPRIVATEKEY)._id;
  const user = await User.findById(_id);
  if (!user) {
    return next(new ErrorHandler(401, "please login"));
  }

  req.user = user;
  next();
});

const isAdmin = function (req, resp, next) {
  if (req.user.role === "user") {
    return next(
      new ErrorHandler(403, "User with this role can not acesss this resource")
    );
  }
  next();
};

module.exports.isAuthenticatedUser = isAuthenticatedUser;
module.exports.isAdmin = isAdmin;
