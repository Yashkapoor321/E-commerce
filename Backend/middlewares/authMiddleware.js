const jwt = require("jsonwebtoken");
const asyncHandeler = require("../utils/asyncHandeler");
const ApiError = require("../utils/ApiError");
const User = require("../models/userModel");

const authMiddleware = asyncHandeler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      console.log(decoded);        
      // Check if user exists in the database
      const user = await User.findById(decoded?.id);
      if (!user) {
        throw new ApiError(401, "User not found");
      }

      req.user = user;
      next(); // Continue to the next middleware or route
    } catch (error) {
      throw new ApiError(401, "Not Authorized, Token failed or expired");
    }
  } else {
    throw new ApiError(401, "Not Authorized, No token attached to header");
  }
});

module.exports = authMiddleware;
