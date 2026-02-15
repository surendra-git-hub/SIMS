import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";

/**
 * Navigation Component
 */
export const Navigation = ({ user, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="nav-brand">Hospital Appointment System</h1>

        <ul className="nav-menu">
          <li>
            <button className="nav-link" onClick={() => navigate("/dashboard")}>
              Dashboard
            </button>
          </li>
          <li>
            <button className="nav-link" onClick={() => navigate("/doctors")}>
              Doctors
            </button>
          </li>
          <li>
            <button
              className="nav-link"
              onClick={() => navigate("/appointments")}
            >
              My Appointments
            </button>
          </li>
          <li>
            <button className="nav-link" onClick={() => navigate("/profile")}>
              Profile
            </button>
          </li>

          {user?.role === "admin" && (
            <li>
              <button className="nav-link" onClick={() => navigate("/admin")}>
                Admin Panel
              </button>
            </li>
          )}

          <li>
            <button className="nav-link logout-btn" onClick={handleLogout}>
              Logout ({user?.name})
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};
