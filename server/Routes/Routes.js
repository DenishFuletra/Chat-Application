const express = require("express");
const {
  RegisterUser,
  AuthUser,
  AllUser,
} = require("../controllers/UserControllers");

const { CheckUser } = require("../middleware/AuthMiddleware");

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", AuthUser);

router.get("/", CheckUser, AllUser);

module.exports = router;
