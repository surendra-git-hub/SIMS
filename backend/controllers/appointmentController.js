const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const User = require("../models/User");

/**
 * Get all appointments for logged in user
 * @route GET /api/appointments
 */
exports.getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ userId: req.user.id })
      .populate("doctorId", "name specialization email phone")
      .sort({ appointmentDate: 1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get single appointment
 * @route GET /api/appointments/:id
 */
exports.getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("userId", "name email phone")
      .populate("doctorId", "name specialization email phone");

    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    // Check if user is owner of appointment or admin
    if (
      appointment.userId._id.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Book appointment
 * @route POST /api/appointments
 */
exports.bookAppointment = async (req, res) => {
  try {
    const { doctorName, appointmentDate, timeSlot, reason } = req.body;

    // Log incoming data for debugging
    console.log("Booking appointment with data:", {
      doctorName,
      appointmentDate,
      timeSlot,
      reason,
    });

    // Validate required fields and provide specific error messages
    if (!doctorName) {
      return res.status(400).json({
        success: false,
        message: "Doctor name is required",
      });
    }
    if (!appointmentDate) {
      return res.status(400).json({
        success: false,
        message: "Appointment date is required",
      });
    }
    if (!timeSlot) {
      return res.status(400).json({
        success: false,
        message: "Time slot is required",
      });
    }
    if (!reason) {
      return res.status(400).json({
        success: false,
        message: "Reason for visit is required",
      });
    }

    // Find doctor by name
    const doctor = await Doctor.findOne({ name: doctorName });
    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    // Check if appointment slot already booked
    const existingAppointment = await Appointment.findOne({
      doctorId: doctor._id,
      appointmentDate,
      timeSlot,
      status: { $ne: "cancelled" },
    });

    if (existingAppointment) {
      return res.status(400).json({
        success: false,
        message: "This appointment slot is already booked",
      });
    }

    // Create appointment
    const appointment = await Appointment.create({
      userId: req.user.id,
      doctorId: doctor._id,
      appointmentDate,
      timeSlot,
      reason,
      status: "scheduled",
    });

    // Populate the created appointment
    await appointment.populate("doctorId", "name specialization email phone");

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update appointment (change status + notes)
 * @route PUT /api/appointments/:id
 */
exports.updateAppointment = async (req, res) => {
  try {
    const { status, notes } = req.body;

    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    // Check if user is owner of appointment
    if (
      appointment.userId.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    // Update appointment
    if (status) appointment.status = status;
    if (notes) appointment.notes = notes;

    await appointment.save();
    await appointment.populate("doctorId", "name specialization email phone");

    res.status(200).json({
      success: true,
      message: "Appointment updated successfully",
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Cancel appointment
 * @route DELETE /api/appointments/:id
 */
exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    // Check if user is owner of appointment
    if (
      appointment.userId.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res
        .status(403)
        .json({ success: false, message: "Not authorized" });
    }

    // Check if appointment can be cancelled
    if (appointment.status === "cancelled") {
      return res
        .status(400)
        .json({ success: false, message: "Appointment is already cancelled" });
    }

    // Cancel appointment
    appointment.status = "cancelled";
    await appointment.save();

    res.status(200).json({
      success: true,
      message: "Appointment cancelled successfully",
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get all appointments (Admin only)
 * @route GET /api/admin/appointments
 */
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("userId", "name email phone")
      .populate("doctorId", "name specialization email phone")
      .sort({ appointmentDate: -1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
