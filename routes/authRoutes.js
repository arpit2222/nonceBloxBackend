const express = require("express");
const { registerUser, loginUser } = require("../controllers/authControllers");

const router = express.Router();

// Auth Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;