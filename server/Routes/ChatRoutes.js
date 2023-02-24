const express = require("express");
const { CheckUser } = require("../middleware/AuthMiddleware");
const {
  AccessChat,
  GetAllChat,
  CreateGroup,
  RenameGroup,
  RemoveFromGroup,
  AddedToGroup,
} = require("../controllers/ChatControllers");

const router = express.Router();

router.post("/", CheckUser, AccessChat);
router.get("/", CheckUser, GetAllChat);
router.post("/group", CheckUser, CreateGroup);
router.put("/renamegroup", CheckUser, RenameGroup);
router.put("/removegroup", CheckUser, RemoveFromGroup);
router.put("/addgroup", CheckUser, AddedToGroup);

module.exports = router;
