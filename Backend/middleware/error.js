function errorHandler(err, req, resp, next) {
  var errMsg = err.message || "internal error occurred";
  var errCode = err.statusCode || 500;
  resp.status(errCode).json({ success: false, error: errMsg });
}

module.exports = errorHandler;
