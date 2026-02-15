import React, { useState, useEffect } from "react";
import { appointmentAPI, doctorAPI } from "../services/api";
import "./Appointments.css";

/**
 * Appointments Page Component
 */
const AppointmentsPage = ({ bookingData, onClearBookingData }) => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    doctorName: bookingData?.doctor?.name || "",
    appointmentDate: "",
    timeSlot: "",
    reason: "",
  });

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (bookingData?.doctor) {
      setFormData((prev) => ({
        ...prev,
        doctorName: bookingData.doctor.name,
      }));
      setShowBookingForm(true);
    }
  }, [bookingData]);

  const fetchDoctors = async () => {
    try {
      const response = await doctorAPI.getAllDoctors();
      setDoctors(response.data.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await appointmentAPI.getUserAppointments();
      setAppointments(response.data.data);
    } catch (error) {
      setMessage("Error fetching appointments");
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Submitting appointment with data:", formData);

    try {
      await appointmentAPI.bookAppointment(formData);
      setMessage("Appointment booked successfully");
      setFormData({
        doctorName: "",
        appointmentDate: "",
        timeSlot: "",
        reason: "",
      });
      setShowBookingForm(false);
      fetchAppointments();
      onClearBookingData?.();
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error booking appointment");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      try {
        await appointmentAPI.cancelAppointment(appointmentId);
        setMessage("Appointment cancelled successfully");
        fetchAppointments();
        setTimeout(() => setMessage(""), 3000);
      } catch (error) {
        setMessage("Error cancelling appointment");
      }
    }
  };

  return (
    <div className="appointments-page">
      <h2>My Appointments</h2>

      {message && (
        <div
          className={message.includes("Error") ? "error-box" : "success-box"}
        >
          {message}
        </div>
      )}

      {!showBookingForm ? (
        <button
          onClick={() => setShowBookingForm(true)}
          className="btn-primary"
        >
          + New Appointment
        </button>
      ) : (
        <form onSubmit={handleBookAppointment} className="booking-form">
          <h3>Book Appointment</h3>

          <div className="form-group">
            <label htmlFor="doctorName">Select Doctor</label>
            <select
              id="doctorName"
              name="doctorName"
              value={formData.doctorName}
              onChange={handleFormChange}
              required
            >
              <option value="">-- Choose a Doctor --</option>
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor.name}>
                  {doctor.name} - {doctor.specialization}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="appointmentDate">Appointment Date</label>
            <input
              id="appointmentDate"
              type="datetime-local"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleFormChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="timeSlot">Time Slot</label>
            <input
              id="timeSlot"
              type="time"
              name="timeSlot"
              value={formData.timeSlot}
              onChange={handleFormChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="reason">Reason for Visit</label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleFormChange}
              placeholder="Describe your reason for the appointment"
              required
            />
          </div>

          <div className="form-buttons">
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Booking..." : "Book Appointment"}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowBookingForm(false);
                onClearBookingData?.();
              }}
              className="btn-secondary"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <h3>Scheduled Appointments</h3>

      {appointments.length === 0 ? (
        <p>No appointments scheduled</p>
      ) : (
        <div className="appointments-list">
          {appointments.map((appointment) => (
            <div key={appointment._id} className="appointment-card">
              <div className="appointment-header">
                <h4>{appointment.doctorId?.name}</h4>
                <span className={`status ${appointment.status}`}>
                  {appointment.status}
                </span>
              </div>

              <p>
                <strong>Specialization:</strong>{" "}
                {appointment.doctorId?.specialization}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(appointment.appointmentDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong> {appointment.timeSlot}
              </p>
              <p>
                <strong>Reason:</strong> {appointment.reason}
              </p>

              {appointment.notes && (
                <p>
                  <strong>Notes:</strong> {appointment.notes}
                </p>
              )}

              {appointment.status === "scheduled" && (
                <button
                  onClick={() => handleCancelAppointment(appointment._id)}
                  className="btn-danger"
                >
                  Cancel Appointment
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;
