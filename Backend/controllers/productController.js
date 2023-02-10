const Product = require("../models/productSchema");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/Apifeatures");

const getAllProduct = catchAsyncError(async (req, resp, next) => {
  const resultPerPage = req.query.limit || 10;
  let searching = new ApiFeatures(Product.find({}), req.query)
    .search()
    .filter();

  let products = await searching.query;
  let productCount = products.length;
  searching = searching.pagination(resultPerPage);
  products = await searching.query.clone();

  return resp.status(200).json({
    success: true,
    products,
    resultPerPage,
    productCount,
  });
});

const createProduct = catchAsyncError(async (req, resp) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  return resp.status(201).json({
    success: true,
    newProduct,
  });
});

const deleteProduct = catchAsyncError(async (req, resp, next) => {
  const productId = req.params.productId;
  const deleteProduct = await Product.findById({ _id: productId });
  console.log(deleteProduct);

  if (!deleteProduct) {
    const error = new ErrorHandler(404, "product not found");
    next(error);
  } else {
    await deleteProduct.remove();

    resp.status(200).json({
      success: true,
      deleteProduct,
    });
  }
});

const updateProduct = catchAsyncError(async (req, resp, next) => {
  const filter = req.params.productId;
  const update = req.body;

  const product = await Product.findById({ _id: filter });
  console.log({ product, ...update });

  if (!product) {
    const error = new ErrorHandler(404, "Product not found");
    next(error);
  } else {
    await product.update({ product, ...update });

    resp.status(200).json({
      success: true,
      updateProduct,
    });
  }
});

const getProductDetails = catchAsyncError(async (req, resp, next) => {
  const productId = req.params.productId;
  const product = await Product.findById({ _id: productId });

  if (!product) {
    const error = new ErrorHandler(404, "product not found");
    next(error);
  } else {
    resp.status(200).json({
      success: true,
      product,
    });
  }
});

module.exports.getAllProduct = getAllProduct;
module.exports.createProduct = createProduct;
module.exports.updateProduct = updateProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.getProductDetails = getProductDetails;
