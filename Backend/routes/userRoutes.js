const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, isAdmin } = require("../middleware/auth");
const {
  registerUser,
  updateUser,
  deleteUser,
  Login,
  LogOut,
  getAllUser,
  getUserDetails,
  updatePassword,
  getUserDetailsByAdmin,
  updateUserRole,
  addProductReview,
  deleteProductReview,
} = require("../controllers/userController");

// routes
router.route("/user/register").post(registerUser);

router.route("/user/me/update").put(isAuthenticatedUser, updateUser);

router.route("/user/login").post(Login);

router.route("/user/logout").get(LogOut);

router.route("/user/me").get(isAuthenticatedUser, getUserDetails);

router
  .route("/user/me/updatepassword")
  .put(isAuthenticatedUser, updatePassword);

router.route("/admin/users").get(isAuthenticatedUser, isAdmin, getAllUser);

router
  .route("/admin/user/:userId")
  .get(isAuthenticatedUser, isAdmin, getUserDetailsByAdmin)
  .delete(isAuthenticatedUser, isAdmin, deleteUser)
router
  .route("/admin/user/updaterole/:userId")
  .put(isAuthenticatedUser, isAdmin, updateUserRole);
;  

router.route("/user/review/").put(isAuthenticatedUser, addProductReview);

router
  .route("/user/review/:productid")
  .delete(isAuthenticatedUser, deleteProductReview);

module.exports = router;
