import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import { authAPI } from "../services/api";
import { LoginForm } from "../components/LoginForm";
import { RegisterForm } from "../components/RegisterForm";
import "../components/Auth.css";

/**
 * Authentication Page
 * Handles both login and registration
 */
const AuthPage = () => {
  const { login } = useContext(AuthContext);
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(location.pathname === "/login");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  // Update form based on route
  useEffect(() => {
    setIsLogin(location.pathname === "/login");
    setErrors([]);
  }, [location.pathname]);

  const handleRegister = async (formData) => {
    setLoading(true);
    setErrors([]);

    try {
      const response = await authAPI.register(formData);
      login(response.data.user, response.data.token);
      window.location.href = "/dashboard";
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Registration failed";
      setErrors([errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (formData) => {
    setLoading(true);
    setErrors([]);

    try {
      const response = await authAPI.login(formData);
      login(response.data.user, response.data.token);
      window.location.href = "/dashboard";
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed";
      setErrors([errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {isLogin ? (
          <LoginForm
            onSubmit={handleLogin}
            errors={errors}
            loading={loading}
            onRegisterClick={() => {
              setIsLogin(false);
              setErrors([]);
            }}
          />
        ) : (
          <RegisterForm
            onSubmit={handleRegister}
            errors={errors}
            loading={loading}
            onLoginClick={() => {
              setIsLogin(true);
              setErrors([]);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
