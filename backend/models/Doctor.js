const mongoose = require("mongoose");

/**
 * Doctor Schema for displaying doctors with specialization and availability
 */
const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide doctor name"],
      trim: true,
    },
    specialization: {
      type: String,
      required: [true, "Please provide specialization"],
      enum: [
        "Cardiology",
        "Neurology",
        "Orthopedics",
        "Pediatrics",
        "Dermatology",
        "General",
      ],
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Please provide phone number"],
    },
    qualifications: {
      type: String,
      required: [true, "Please provide qualifications"],
    },
    experience: {
      type: Number,
      required: [true, "Please provide years of experience"],
    },
    availability: {
      dayOfWeek: {
        type: [String],
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
      },
      startTime: String,
      endTime: String,
    },
    consultationFee: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Doctor", doctorSchema);
