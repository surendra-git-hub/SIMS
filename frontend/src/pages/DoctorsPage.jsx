import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doctorAPI } from "../services/api";
import "./Doctors.css";

/**
 * Doctors Listing and Search Page
 */
const DoctorsPage = ({ onSelectDoctor }) => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await doctorAPI.getAllDoctors();
      setDoctors(response.data.data);
      setError("");
    } catch (err) {
      setError("Error fetching doctors");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      fetchDoctors();
      return;
    }

    setLoading(true);
    try {
      const response = await doctorAPI.searchDoctors(searchQuery);
      setDoctors(response.data.data);
      setError("");
    } catch (err) {
      setError("Error searching doctors");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="doctors-page">
      <h2>Find a Doctor</h2>

      {error && <div className="error-box">{error}</div>}

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search by name or specialization"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="btn-primary">
          Search
        </button>
        <button
          type="button"
          onClick={() => {
            setSearchQuery("");
            fetchDoctors();
          }}
          className="btn-secondary"
        >
          Clear
        </button>
      </form>

      {loading && <p>Loading doctors...</p>}

      <div className="doctors-grid">
        {doctors.map((doctor) => (
          <div key={doctor._id} className="doctor-card">
            <h3>{doctor.name}</h3>
            <p>
              <strong>Specialization:</strong> {doctor.specialization}
            </p>
            <p>
              <strong>Experience:</strong> {doctor.experience} years
            </p>
            <p>
              <strong>Qualifications:</strong> {doctor.qualifications}
            </p>
            <p>
              <strong>Phone:</strong> {doctor.phone}
            </p>
            <p>
              <strong>Consultation Fee:</strong> ${doctor.consultationFee}
            </p>

            {doctor.availability && (
              <p>
                <strong>Available:</strong>{" "}
                {doctor.availability.dayOfWeek?.join(", ")} from{" "}
                {doctor.availability.startTime} to {doctor.availability.endTime}
              </p>
            )}

            <button
              onClick={() => {
                onSelectDoctor && onSelectDoctor(doctor);
                navigate("/appointments");
              }}
              className="btn-primary"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      {!loading && doctors.length === 0 && <p>No doctors found</p>}
    </div>
  );
};

export default DoctorsPage;
