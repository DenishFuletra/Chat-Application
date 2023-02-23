const asyncHandler = require("express-async-handler");
const user = require("../models/UserModels");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;
//console.log(jwtSecret);

const GenerateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, { expiresIn: "30d" });
};

const RegisterUser = asyncHandler(async (req, res) => {
  let { name, email, password, profile } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new error("Please enter all the fields");
  }

  const userExist = await user.findOne({ email });
  if (userExist) {
    return res.status(400).send("user already exists");
  }
  if (profile == "") {
    profile =
      "https://www.meme-arsenal.com/memes/b6a18f0ffd345b22cd219ef0e73ea5fe.jpg";
  }
  const createUser = await user.create({
    name,
    email,
    password,
    profile,
  });

  if (createUser) {
    return res.status(200).json({
      _id: createUser._id,
      name: createUser.name,
      email: createUser.email,
      profile: createUser.profile,
      token: GenerateToken(createUser._id),
    });
  } else {
    return res.status(400).send("Failed to create the user");
  }
});

const AuthUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new error("Please enter all the fields");
  }
  const userExist = await user.findOne({ email });

  if (userExist && (await userExist.matchPassword(password))) {
    res.json({
      _id: userExist._id,
      name: userExist.name,
      email: userExist.email,
      isAdmin: userExist.isAdmin,
      pic: userExist.pic,
      token: GenerateToken(userExist._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { RegisterUser, AuthUser };
