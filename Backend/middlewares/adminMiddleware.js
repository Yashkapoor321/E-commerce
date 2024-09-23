const asyncHandeler = require("../utils/asyncHandeler");
const ApiError = require("../utils/ApiError");

const adminMiddleware = asyncHandeler(async (req, res, next) => {
  // Check if req.user exists (comes from authMiddleware)
  if (!req.user) {
    throw new ApiError(401, "Not Authorized");
  }

  // Check if the user has an admin role
  if (req.user.role !== "admin") {
    throw new ApiError(403, "You are not authorized as an admin");
  }

  next(); // Proceed to the next middleware or route
});

module.exports = adminMiddleware;
