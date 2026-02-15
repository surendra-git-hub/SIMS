import React, { useState, useEffect } from "react";
import { doctorAPI, adminAPI } from "../services/api";
import "./Admin.css";

/**
 * Admin Panel Component
 */
const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("doctors");
  const [doctors, setDoctors] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [doctorForm, setDoctorForm] = useState({
    name: "",
    specialization: "General",
    email: "",
    phone: "",
    qualifications: "",
    experience: "",
    consultationFee: "",
  });

  useEffect(() => {
    if (activeTab === "doctors") {
      fetchDoctors();
    } else if (activeTab === "users") {
      fetchUsers();
    }
  }, [activeTab]);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await doctorAPI.getAllDoctors();
      setDoctors(response.data.data);
    } catch (error) {
      setMessage("Error fetching doctors");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await adminAPI.getAllUsers();
      setUsers(response.data.data);
    } catch (error) {
      setMessage("Error fetching users");
    } finally {
      setLoading(false);
    }
  };

  const handleDoctorFormChange = (e) => {
    const { name, value } = e.target;
    setDoctorForm({ ...doctorForm, [name]: value });
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await doctorAPI.addDoctor({
        ...doctorForm,
        experience: parseInt(doctorForm.experience),
        consultationFee: parseFloat(doctorForm.consultationFee),
      });
      setMessage("Doctor added successfully");
      setDoctorForm({
        name: "",
        specialization: "General",
        email: "",
        phone: "",
        qualifications: "",
        experience: "",
        consultationFee: "",
      });
      setShowForm(false);
      fetchDoctors();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error adding doctor");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDoctor = async (doctorId) => {
    if (window.confirm("Are you sure you want to delete this doctor?")) {
      try {
        await doctorAPI.deleteDoctor(doctorId);
        setMessage("Doctor deleted successfully");
        fetchDoctors();
        setTimeout(() => setMessage(""), 3000);
      } catch (error) {
        setMessage("Error deleting doctor");
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await adminAPI.deleteUser(userId);
        setMessage("User deleted successfully");
        fetchUsers();
        setTimeout(() => setMessage(""), 3000);
      } catch (error) {
        setMessage("Error deleting user");
      }
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>

      {message && (
        <div
          className={message.includes("Error") ? "error-box" : "success-box"}
        >
          {message}
        </div>
      )}

      <div className="admin-tabs">
        <button
          className={activeTab === "doctors" ? "tab active" : "tab"}
          onClick={() => setActiveTab("doctors")}
        >
          Doctors
        </button>
        <button
          className={activeTab === "users" ? "tab active" : "tab"}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
      </div>

      {activeTab === "doctors" && (
        <div className="admin-section">
          <h3>Manage Doctors</h3>

          {!showForm ? (
            <button onClick={() => setShowForm(true)} className="btn-primary">
              + Add Doctor
            </button>
          ) : (
            <form onSubmit={handleAddDoctor} className="admin-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={doctorForm.name}
                  onChange={handleDoctorFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={doctorForm.email}
                  onChange={handleDoctorFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={doctorForm.phone}
                  onChange={handleDoctorFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Specialization</label>
                <select
                  name="specialization"
                  value={doctorForm.specialization}
                  onChange={handleDoctorFormChange}
                >
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div className="form-group">
                <label>Qualifications</label>
                <input
                  type="text"
                  name="qualifications"
                  value={doctorForm.qualifications}
                  onChange={handleDoctorFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Experience (Years)</label>
                <input
                  type="number"
                  name="experience"
                  value={doctorForm.experience}
                  onChange={handleDoctorFormChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Consultation Fee</label>
                <input
                  type="number"
                  step="0.01"
                  name="consultationFee"
                  value={doctorForm.consultationFee}
                  onChange={handleDoctorFormChange}
                  required
                />
              </div>

              <div className="form-buttons">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                >
                  {loading ? "Adding..." : "Add Doctor"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {loading && <p>Loading doctors...</p>}

          <div className="admin-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Specialization</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Experience</th>
                  <th>Fee</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map((doctor) => (
                  <tr key={doctor._id}>
                    <td>{doctor.name}</td>
                    <td>{doctor.specialization}</td>
                    <td>{doctor.email}</td>
                    <td>{doctor.phone}</td>
                    <td>{doctor.experience}</td>
                    <td>${doctor.consultationFee}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteDoctor(doctor._id)}
                        className="btn-danger-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "users" && (
        <div className="admin-section">
          <h3>Manage Users</h3>

          {loading && <p>Loading users...</p>}

          <div className="admin-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                    <td>
                      <button
                        onClick={() => handleDeleteUser(user._id)}
                        className="btn-danger-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
