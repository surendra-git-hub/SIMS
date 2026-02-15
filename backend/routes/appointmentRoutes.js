const express = require("express");
const {
  getUserAppointments,
  getAppointment,
  bookAppointment,
  updateAppointment,
  cancelAppointment,
  getAllAppointments,
} = require("../controllers/appointmentController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

/**
 * Appointment Routes
 */

// Protected routes - Patient
router.get("/", protect, getUserAppointments); // Get user's appointments
router.get("/:id", protect, getAppointment); // Get single appointment
router.post("/", protect, bookAppointment); // Book appointment
router.put("/:id", protect, updateAppointment); // Update appointment
router.delete("/:id", protect, cancelAppointment); // Cancel appointment

// Protected routes - Admin
router.get("/admin/all", protect, authorize("admin"), getAllAppointments); // Get all appointments

module.exports = router;
