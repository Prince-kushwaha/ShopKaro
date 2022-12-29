const User = require("../models/userSchema");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const validator = require("validator");
const sendJwtToken = require("../utils/sendJwtToken");
const Product = require("../models/productSchema");
const cloundary = require("cloudinary");
// register user
const registerUser = catchAsyncError(async function (req, resp, next) {
  let { email, name, password, avatar } = req.body;
  avatar = avatar || req.files.avatar;
  
  if (!validator.isStrongPassword(password)) {
    return next(
      new ErrorHandler(
        400,
        "Password have :minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1"
      )
    );
  }
  
  let userData;

  if (avatar) {
    let image = await cloundary.v2.uploader.upload(avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    userData = {
      email,
      password,
      name,
      avatar: {
        public_id: image.public_id,
        url: image.secure_url,
      },
    };
  } else {
    userData = {
      email,
      password,
      name,
    };
  }

  const user = new User(userData);
  await user.save();
  sendJwtToken(user, 201, resp);
});

// Login User
const Login = catchAsyncError(async function (req, resp, next) {
  const { password, email } = req.body;
  console.log(email, password);
  const user = await User.findOne({ email: email }).select("+password");

  if (!user) return next(new ErrorHandler(401, "Invalid email or password"));

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(new ErrorHandler(401, "Invalid email or password"));
  }

  sendJwtToken(user, 200, resp);
});

// Log out User
const LogOut = function (req, resp, next) {
  resp.status(200).clearCookie("token").json({
    success: true,
    message: "User Logout",
  });
};

// get User details
const getUserDetails = async function (req, resp) {
  const user = req.user;
  resp.status(200).json({
    success: true,
    user,
  });
};

// update User details
const updateUser = catchAsyncError(async function (req, resp, next) {
  const _id = req.user._id;
  let { name, email, avatar } = req.body;

  if (!validator.isEmail(email)) {
    return next(new ErrorHandler(400, "enter correct email id"));
  }

  if (!name) {
    return next(new ErrorHandler(400, "enter correct name"));
  }

  let newUserDetail = {
    email: req.body.email,
    name: req.body.name,
  };

  if (avatar) {
    let { avatar: prevImage } = await User.findById(_id);
    if (prevImage && prevImage.public_id) {
      let resp = await cloundary.v2.uploader.destroy(prevImage.public_id);
      console.log(resp);
    }

    let image = await cloundary.v2.uploader.upload(avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserDetail = {
      ...newUserDetail,
      avatar: {
        public_id: image.public_id,
        url: image.url,
      },
    };
  }

  const user = await User.findByIdAndUpdate(_id, newUserDetail, {
    runValidators: true,
  });

  resp.status(200).json({
    success: true,
    user,
  });
});

// update user password
const updatePassword = catchAsyncError(async function (req, resp, next) {
  const _id = req.user._id;

  const user = await User.findById(_id).select("+password");

  const { password, confirmpassword, oldpassword } = req.body;
  console.log(password, confirmpassword, oldpassword);
  const isPasswordMatch = await user.comparePassword(oldpassword);

  if (!isPasswordMatch) {
    return next(new ErrorHandler(401, "old password is not correct"));
  }

  if (password != confirmpassword) {
    return next(
      new ErrorHandler(400, "password and confirmpassword is not equal")
    );
  }

  user.password = password;
  await user.save();

  resp.status(200).json({
    success: true,
    message: "password successfully update",
  });
});

// get all User (Admin)
const getAllUsers = catchAsyncError(async function (req, resp) {
  const users = await User.find({});
  resp.status(200).json({
    success: true,
    users,
  });
});

// get single user details --Admin
const getUserDetailsByAdmin = catchAsyncError(async function (req, resp) {
  const userId = req.params.userId;
  const user = await User.findById(userId);

  resp.status(200).json({
    success: true,
    user,
  });
});

// update user role --Admin
const updateUserRole = catchAsyncError(async function (req, resp, next) {
  const userId = req.params.userId;
  const user = await User.findByIdAndUpdate(userId, { role: req.body.role });

  resp.status(200).json({
    success: true,
    user,
  });
});

// delete user --Admin
const deleteUser = catchAsyncError(async function (req, resp, next) {
  const userId = req.params.userId;
  const user = await User.findById(userId);

  if (!user) {
    return next(new ErrorHandler(404, "user not exist"));
  }

  await user.delete();

  resp.status(200).json({
    success: true,
    message: "User is delete successfully",
  });
});

// Add product review

const addProductReview = catchAsyncError(async function (req, resp) {
  const { comment, rating, productid } = req.body;
  const userName = req.user.name;
  const userid = req.user._id;

  let product = await Product.findById(productid);
  const productReview = {
    user: userid,
    name: userName,
    comment,
    rating,
  };

  // product is already reviewed by user
  let isReviewed = false;

  for (let i = 0; i < product.reviews.length; i++) {
    if (product.reviews[i].user.toString() === userid.toString()) {
      product.reviews[i] = productReview;
      isReviewed = true;
    }
  }

  if (!isReviewed) {
    product.reviews.push(productReview);
  }

  // update rating of product
  let sumOfRating = 0;

  for (let i = 0; i < product.reviews.length; i++) {
    sumOfRating = sumOfRating + product.reviews[i].rating;
  }

  product.rating = sumOfRating / product.reviews.length;
  product.numOfRating = product.reviews.length;

  product = await product.save();

  resp.status(201).json({
    success: true,
    product,
  });
});

// delete Product review --User
const deleteProductReview = catchAsyncError(async function (req, resp, next) {
  const userId = req.user._id;
  const productId = req.params.productid;

  let product = await Product.findById(productId);
  let productRating = 0;

  if (!product) {
    return next(new ErrorHandler(404, "product not exist"));
  }

  const reviews = product.reviews.filter(function (review) {
    return review.user._id.toString() != userId.toString();
  });

  product.reviews = reviews;

  reviews.forEach(function (review) {
    productRating = productRating + review.rating;
  });

  product.numOfRating = reviews.length;
  product.rating = productRating / reviews.length;

  product = await product.save();

  resp.status(200).json({
    success: true,
    product,
  });
});

module.exports.registerUser = registerUser;
module.exports.updateUser = updateUser;
module.exports.deleteUser = deleteUser;
module.exports.Login = Login;
module.exports.LogOut = LogOut;
module.exports.getUserDetails = getUserDetails;
module.exports.updatePassword = updatePassword;
module.exports.getAllUser = getAllUsers;
module.exports.getUserDetailsByAdmin = getUserDetailsByAdmin;
module.exports.updateUserRole = updateUserRole;
module.exports.addProductReview = addProductReview;
module.exports.deleteProductReview = deleteProductReview;
