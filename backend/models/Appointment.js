const mongoose = require("mongoose");

/**
 * Appointment Schema for booking, viewing, and canceling appointments
 */
const appointmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: [true, "Please provide appointment date"],
    },
    timeSlot: {
      type: String,
      required: [true, "Please provide time slot"],
    },
    reason: {
      type: String,
      required: [true, "Please provide reason for appointment"],
    },
    status: {
      type: String,
      enum: ["scheduled", "completed", "cancelled"],
      default: "scheduled",
    },
    notes: String,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Appointment", appointmentSchema);
