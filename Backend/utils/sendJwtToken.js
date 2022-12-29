async function sendJwtToken(user, statusCode, resp) {
  const token = await user.genJwtToken();

  const option = {
    maxAge: process.env.Cookie_Expire * 24 * 60 * 60 * 1000,
    httpOnly: true,
  };

  resp.status(statusCode).cookie("token", token, option).json({
    success: true,
    user,
    token,
  });
}

module.exports = sendJwtToken;
