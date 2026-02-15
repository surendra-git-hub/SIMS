import React, { useState } from "react";
import "./Auth.css";

/**
 * Login Form Component
 */
export const LoginForm = ({
  onSubmit,
  errors = [],
  loading = false,
  onRegisterClick,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Login</h2>

      {errors.length > 0 && (
        <div className="error-box">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

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
      </div>

      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? "Logging in..." : "Login"}
      </button>

      <p className="auth-link">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={onRegisterClick}
          className="link-button"
          id="clicktoregister"
        >
          Register here
        </button>
      </p>
    </form>
  );
};
