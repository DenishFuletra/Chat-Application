const asyncHandler = require("express-async-handler");
const user = require("../models/UserModels");

const RegisterUser = asyncHandler(async (req, res) => {
  const { name, email, password, profile } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new error("Please enter all the fields");
  }

  const userExist = await user.findOne({ email });
  if (userExist) {
    return res.status(400).send("user already exists");
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
      token: GenerateToken(createUser._id) 
    });
  } else {
    return res.status(400).send("Failed to create the user");
  }
});

module.exports = { RegisterUser };