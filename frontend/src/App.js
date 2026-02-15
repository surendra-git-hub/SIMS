import React, { useState, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthContext, AuthProvider } from "./utils/AuthContext";
import { ProtectedRoute, AdminRoute } from "./utils/ProtectedRoute";
import { Navigation } from "./components/Navigation";

// Pages
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import DoctorsPage from "./pages/DoctorsPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import ProfilePage from "./pages/ProfilePage";
import AdminPanel from "./pages/AdminPanel";

/**
 * Main App Component with routing
 */
function AppContent() {
  const { user, token, logout } = useContext(AuthContext);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <>
      {token && <Navigation user={user} onLogout={logout} />}
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />

        {/* Protected Patient Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctors"
          element={
            <ProtectedRoute>
              <DoctorsPage onSelectDoctor={setSelectedDoctor} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <AppointmentsPage
                bookingData={selectedDoctor ? { doctor: selectedDoctor } : null}
                onClearBookingData={() => setSelectedDoctor(null)}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />

        {/* Default Route */}
        <Route
          path="/"
          element={
            token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />

        {/* 404 Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

/**
 * Root App Component with AuthProvider
 */
function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
