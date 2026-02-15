import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import "./Dashboard.css";

/**
 * Dashboard/Home Page Component
 */
const DashboardPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <h1>Welcome, {user?.name}!</h1>
        <p className="subtitle">Hospital Appointment Management System</p>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>👨‍⚕️ Find Doctors</h3>
            <p>Search and view available doctors with their specializations</p>
            <button
              onClick={() => navigate("/doctors")}
              className="btn-primary"
            >
              Browse Doctors
            </button>
          </div>

          <div className="dashboard-card">
            <h3>📅 My Appointments</h3>
            <p>View and manage your scheduled appointments</p>
            <button
              onClick={() => navigate("/appointments")}
              className="btn-primary"
            >
              View Appointments
            </button>
          </div>

          <div className="dashboard-card">
            <h3>👤 My Profile</h3>
            <p>View and edit your profile information</p>
            <button
              onClick={() => navigate("/profile")}
              className="btn-primary"
            >
              View Profile
            </button>
          </div>

          {user?.role === "admin" && (
            <div className="dashboard-card">
              <h3>⚙️ Admin Panel</h3>
              <p>Manage doctors, users, and appointments</p>
              <button
                onClick={() => navigate("/admin")}
                className="btn-primary"
              >
                Go to Admin
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
