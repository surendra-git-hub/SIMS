import React, { useState } from "react";
import "./Auth.css";

/**
 * Registration Form Component
 * Handles user registration with password validation
 */
export const RegisterForm = ({
  onSubmit,
  errors = [],
  loading = false,
  onLoginClick,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordErrors, setPasswordErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validate password in real-time
    if (name === "password") {
      validatePasswordStrength(value);
    }
  };

  const validatePasswordStrength = (password) => {
    const errors = [];

    if (password.length < 8 || password.length > 15) {
      errors.push("Password must be 8-15 characters long");
    }
    if (!/\d/.test(password)) {
      errors.push("Password must contain at least one digit");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter");
    }
    if (!/[!@#$%&*()-+=^.]/.test(password)) {
      errors.push(
        "Password must contain at least one special character (!@#$%&*()-+=^.)",
      );
    }
    if (/\s/.test(password)) {
      errors.push("Password must not contain whitespace");
    }

    setPasswordErrors(errors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Register</h2>

      {errors.length > 0 && (
        <div className="error-box">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="john@example.com"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="1234567890"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          required
        />
        {passwordErrors.length > 0 && (
          <div className="password-errors">
            {passwordErrors.map((error, index) => (
              <p key={index}>✗ {error}</p>
            ))}
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm password"
          required
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? "Registering..." : "Register"}
      </button>

      <p className="auth-link">
        Already have an account?{" "}
        <button type="button" onClick={onLoginClick} className="link-button">
          Login here
        </button>
      </p>
    </form>
  );
};
