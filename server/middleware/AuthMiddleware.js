const jwt = require("jsonwebtoken");
const user = require("../models/UserModels");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
dotenv.config();

const CheckUser = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      //console.log(token);
      //console.log(process.env.JWT_SECRET);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //console.log(decoded);

      req.user = await user.findById(decoded.id).select("-password");
     // console.log(req.user);

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { CheckUser };
