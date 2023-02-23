const express = require("express");
const { RegisterUser, AuthUser } = require("../controllers/UserControllers");

const router = express.Router();

router.get("/", (req, res) => {
  return res.send("deny");
});

router.post("/register", RegisterUser);
router.post("/login", AuthUser);

module.exports = router;
