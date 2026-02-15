import React, { useState, useContext } from "react";
import { AuthContext } from "../utils/AuthContext";
import { authAPI } from "../services/api";
import "./Profile.css";

/**
 * Profile Page Component
 */
const ProfilePage = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authAPI.updateProfile(profileData);
      updateUser(response.data.data);
      setMessage("Profile updated successfully");
      setEditMode(false);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authAPI.changePassword(passwordData);
      setMessage("Password changed successfully");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setPasswordMode(false);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error changing password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2>My Profile</h2>

        {message && (
          <div
            className={message.includes("Error") ? "error-box" : "success-box"}
          >
            {message}
          </div>
        )}

        <div className="profile-info">
          <div className="info-group">
            <label>Name</label>
            <p>{user?.name}</p>
          </div>

          <div className="info-group">
            <label>Email</label>
            <p>{user?.email}</p>
          </div>

          <div className="info-group">
            <label>Phone</label>
            <p>{user?.phone}</p>
          </div>

          <div className="info-group">
            <label>Role</label>
            <p>{user?.role}</p>
          </div>
        </div>

        {!editMode ? (
          <button onClick={() => setEditMode(true)} className="btn-primary">
            Edit Profile
          </button>
        ) : (
          <form onSubmit={handleUpdateProfile} className="edit-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleProfileChange}
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleProfileChange}
              />
            </div>

            <div className="form-buttons">
              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={() => setEditMode(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <hr />

        {!passwordMode ? (
          <button onClick={() => setPasswordMode(true)} className="btn-primary">
            Change Password
          </button>
        ) : (
          <form onSubmit={handleChangePassword} className="edit-form">
            <h3>Change Password</h3>

            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                name="confirmNewPassword"
                value={passwordData.confirmNewPassword}
                onChange={handlePasswordChange}
                required
              />
            </div>

            <div className="form-buttons">
              <button type="submit" disabled={loading} className="btn-primary">
                {loading ? "Changing..." : "Change Password"}
              </button>
              <button
                type="button"
                onClick={() => setPasswordMode(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
