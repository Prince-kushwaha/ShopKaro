const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const { isAdmin, isAuthenticatedUser } = require("../middleware/auth");
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

const {
  getAllProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductDetails,
} = require("../controllers/productController");
router.route("/products/").get(getAllProduct);

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, isAdmin, createProduct);

router
  .route("/admin/product/:productId")
  .put(isAuthenticatedUser, isAdmin, updateProduct)
  .delete(isAuthenticatedUser, isAdmin, deleteProduct);

router.route("/product/:productId").get(getProductDetails);
module.exports = router;
