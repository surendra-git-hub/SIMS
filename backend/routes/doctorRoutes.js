const express = require("express");
const {
  getAllDoctors,
  getDoctor,
  searchDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

/**
 * Doctor Routes
 */

// Public routes
router.get("/", getAllDoctors); // Get all doctors
router.get("/search", searchDoctors); // Search doctors by name or specialization
router.get("/:id", getDoctor); // Get single doctor

// Protected routes - Admin only
router.post("/", protect, authorize("admin"), addDoctor); // Add doctor
router.put("/:id", protect, authorize("admin"), updateDoctor); // Update doctor
router.delete("/:id", protect, authorize("admin"), deleteDoctor); // Delete doctor

module.exports = router;
