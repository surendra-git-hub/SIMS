const express = require("express");
const {
  register,
  login,
  getMe,
  updateProfile,
  changePassword,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");

const router = express.Router();

/**
 * Authentication Routes
 */

// Public routes
router.post("/register", register); // User registration with password validation
router.post("/login", login); // User login

// Protected routes
router.get("/me", protect, getMe); // Get current user
router.put("/update", protect, updateProfile); // Update user profile
router.put("/change-password", protect, changePassword); // Change password

module.exports = router;
