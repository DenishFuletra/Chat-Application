const express = require("express");
const {RegisterUser} = require ("../controllers/UserControllers")

const router = express.Router();

router.get("/", (req, res) => {
  return res.send("deny");
});

module.exports = router;
