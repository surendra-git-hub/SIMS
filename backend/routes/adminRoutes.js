const express = require("express");
const {
  getAllUsers,
  getUser,
  deleteUser,
} = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

/**
 * Admin Routes
 */

// Protected routes - Admin only
router.get("/users", protect, authorize("admin"), getAllUsers); // Get all users
router.get("/users/:id", protect, authorize("admin"), getUser); // Get single user
router.delete("/users/:id", protect, authorize("admin"), deleteUser); // Delete user

module.exports = router;
