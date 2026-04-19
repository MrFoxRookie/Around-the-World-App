const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUser,
  updateUser,
  updateUserAvatar,
  getCurrentUser,
} = require("../controllers/users");

router.get("/users", getAllUsers);
router.get("/users/me", getCurrentUser);
router.get("/users/:userId", getUser);
router.patch("/users/me", updateUser);
router.patch("/users/me/avatar", updateUserAvatar);

module.exports = router;
