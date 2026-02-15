const Doctor = require("../models/Doctor");

/**
 * Get all doctors
 * @route GET /api/doctors
 */
exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();

    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Get single doctor
 * @route GET /api/doctors/:id
 */
exports.getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    res.status(200).json({
      success: true,
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Search doctors by name or specialization
 * @route GET /api/doctors/search?query=...
 */
exports.searchDoctors = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide search query" });
    }

    // Search by name or specialization
    const doctors = await Doctor.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { specialization: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json({
      success: true,
      count: doctors.length,
      data: doctors,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Add doctor (Admin only)
 * @route POST /api/doctors
 */
exports.addDoctor = async (req, res) => {
  try {
    const {
      name,
      specialization,
      email,
      phone,
      qualifications,
      experience,
      availability,
      consultationFee,
    } = req.body;

    // Validate required fields
    if (
      !name ||
      !specialization ||
      !email ||
      !phone ||
      !qualifications ||
      !experience ||
      !consultationFee
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide all required fields",
        });
    }

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Doctor with this email already exists",
        });
    }

    // Create doctor
    const doctor = await Doctor.create({
      name,
      specialization,
      email,
      phone,
      qualifications,
      experience,
      availability,
      consultationFee,
    });

    res.status(201).json({
      success: true,
      message: "Doctor added successfully",
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Update doctor (Admin only)
 * @route PUT /api/doctors/:id
 */
exports.updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    res.status(200).json({
      success: true,
      message: "Doctor updated successfully",
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Delete doctor (Admin only)
 * @route DELETE /api/doctors/:id
 */
exports.deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res
        .status(404)
        .json({ success: false, message: "Doctor not found" });
    }

    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully",
      data: doctor,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
