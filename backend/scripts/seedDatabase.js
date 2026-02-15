require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected for seeding...");
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Sample patient data
const patientData = [
  { name: "John Doe", email: "john.doe@example.com", phone: "5551234567" },
  { name: "Jane Smith", email: "jane.smith@example.com", phone: "5551234568" },
  {
    name: "Robert Johnson",
    email: "robert.j@example.com",
    phone: "5551234569",
  },
  {
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "5551234570",
  },
  {
    name: "Michael Brown",
    email: "michael.b@example.com",
    phone: "5551234571",
  },
  { name: "Sarah Wilson", email: "sarah.w@example.com", phone: "5551234572" },
  {
    name: "David Miller",
    email: "david.miller@example.com",
    phone: "5551234573",
  },
  {
    name: "Jessica Taylor",
    email: "jessica.t@example.com",
    phone: "5551234574",
  },
  { name: "James Anderson", email: "james.a@example.com", phone: "5551234575" },
  { name: "Lisa Martinez", email: "lisa.m@example.com", phone: "5551234576" },
  {
    name: "William Garcia",
    email: "william.g@example.com",
    phone: "5551234577",
  },
  {
    name: "Nancy Rodriguez",
    email: "nancy.r@example.com",
    phone: "5551234578",
  },
  { name: "Charles Lee", email: "charles.l@example.com", phone: "5551234579" },
  { name: "Karen White", email: "karen.w@example.com", phone: "5551234580" },
  { name: "Mark Harris", email: "mark.h@example.com", phone: "5551234581" },
  { name: "Sandra Martin", email: "sandra.m@example.com", phone: "5551234582" },
];

// Sample doctor data
const doctorData = [
  {
    name: "Dr. Sarah Anderson",
    specialization: "Cardiology",
    email: "dr.sarah.anderson@hospital.com",
    phone: "5559876543",
    qualifications: "MD, Board Certified Cardiologist",
    experience: 12,
    consultationFee: 150,
  },
  {
    name: "Dr. John Smith",
    specialization: "Neurology",
    email: "dr.john.smith@hospital.com",
    phone: "5559876544",
    qualifications: "MD, Board Certified Neurologist",
    experience: 15,
    consultationFee: 160,
  },
  {
    name: "Dr. Emily Chen",
    specialization: "Orthopedics",
    email: "dr.emily.chen@hospital.com",
    phone: "5559876545",
    qualifications: "MD, Board Certified Orthopedic Surgeon",
    experience: 10,
    consultationFee: 170,
  },
  {
    name: "Dr. Michael Johnson",
    specialization: "Pediatrics",
    email: "dr.michael.johnson@hospital.com",
    phone: "5559876546",
    qualifications: "MD, Board Certified Pediatrician",
    experience: 8,
    consultationFee: 120,
  },
  {
    name: "Dr. Lisa Garcia",
    specialization: "Dermatology",
    email: "dr.lisa.garcia@hospital.com",
    phone: "5559876547",
    qualifications: "MD, Board Certified Dermatologist",
    experience: 9,
    consultationFee: 140,
  },
  {
    name: "Dr. David Lee",
    specialization: "General",
    email: "dr.david.lee@hospital.com",
    phone: "5559876548",
    qualifications: "MD, General Medicine",
    experience: 7,
    consultationFee: 100,
  },
  {
    name: "Dr. Rachel Martinez",
    specialization: "Cardiology",
    email: "dr.rachel.martinez@hospital.com",
    phone: "5559876549",
    qualifications: "MD, Board Certified Cardiologist",
    experience: 11,
    consultationFee: 155,
  },
  {
    name: "Dr. Christopher Brown",
    specialization: "Neurology",
    email: "dr.christopher.brown@hospital.com",
    phone: "5559876550",
    qualifications: "MD, Board Certified Neurologist",
    experience: 13,
    consultationFee: 165,
  },
  {
    name: "Dr. Jennifer Wilson",
    specialization: "Orthopedics",
    email: "dr.jennifer.wilson@hospital.com",
    phone: "5559876551",
    qualifications: "MD, Board Certified Orthopedic Surgeon",
    experience: 9,
    consultationFee: 175,
  },
  {
    name: "Dr. James Taylor",
    specialization: "Pediatrics",
    email: "dr.james.taylor@hospital.com",
    phone: "5559876552",
    qualifications: "MD, Board Certified Pediatrician",
    experience: 10,
    consultationFee: 125,
  },
];

// Appointment descriptions
const appointmentReasons = [
  "Regular checkup",
  "Follow-up visit",
  "Pain management",
  "Medication review",
  "Health screening",
  "Treatment consultation",
  "Specialist consultation",
  "Lab results review",
];

// Time slots
const timeSlots = [
  "09:00 AM",
  "09:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "02:00 PM",
  "02:30 PM",
  "03:00 PM",
  "03:30 PM",
  "04:00 PM",
  "04:30 PM",
];

// Seed function
const seedDatabase = async () => {
  try {
    // Clear existing data
    console.log("Clearing existing data...");
    await User.deleteMany({});
    await Doctor.deleteMany({});
    await Appointment.deleteMany({});
    console.log("✓ Existing data cleared");

    // Create patients
    console.log("\nCreating patients...");
    const patients = [];
    for (const data of patientData) {
      const patient = await User.create({
        ...data,
        password: "Password@123",
        role: "patient",
      });
      patients.push(patient);
    }
    console.log(`✓ Created ${patients.length} patients`);

    // Create admin user
    console.log("\nCreating admin user...");
    const admin = await User.create({
      name: "Admin User",
      email: "admin@hospital.com",
      phone: "5559999999",
      password: "AdminPass@123",
      role: "admin",
    });
    console.log("✓ Created admin user");

    // Create doctors
    console.log("\nCreating doctors...");
    const doctors = [];
    for (const data of doctorData) {
      const doctor = await Doctor.create({
        ...data,
        availability: {
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          startTime: "09:00 AM",
          endTime: "05:00 PM",
        },
      });
      doctors.push(doctor);
    }
    console.log(`✓ Created ${doctors.length} doctors`);

    // Create appointments
    console.log("\nCreating appointments...");
    let appointmentCount = 0;
    const statuses = ["scheduled", "completed", "cancelled"];

    for (let i = 0; i < 30; i++) {
      const randomPatient =
        patients[Math.floor(Math.random() * patients.length)];
      const randomDoctor = doctors[Math.floor(Math.random() * doctors.length)];
      const randomStatus =
        statuses[Math.floor(Math.random() * statuses.length)];
      const randomReason =
        appointmentReasons[
          Math.floor(Math.random() * appointmentReasons.length)
        ];
      const randomSlot =
        timeSlots[Math.floor(Math.random() * timeSlots.length)];

      // Generate date between today and 30 days from now
      const appointmentDate = new Date();
      appointmentDate.setDate(
        appointmentDate.getDate() + Math.floor(Math.random() * 30),
      );

      await Appointment.create({
        userId: randomPatient._id,
        doctorId: randomDoctor._id,
        appointmentDate: appointmentDate,
        timeSlot: randomSlot,
        reason: randomReason,
        status: randomStatus,
        notes: `Patient ID: ${randomPatient._id}, Doctor ID: ${randomDoctor._id}`,
      });
      appointmentCount++;
    }
    console.log(`✓ Created ${appointmentCount} appointments`);

    console.log("\n========================================");
    console.log("✓ Database seeding completed successfully!");
    console.log("========================================");
    console.log("\nTest Credentials:");
    console.log("Admin:");
    console.log("  Email: admin@hospital.com");
    console.log("  Password: AdminPass@123");
    console.log("\nSample Patient:");
    console.log("  Email: john.doe@example.com");
    console.log("  Password: Password@123");
    console.log("========================================\n");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Run seeding
connectDB().then(seedDatabase);
