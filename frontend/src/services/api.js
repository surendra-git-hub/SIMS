import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

/**
 * Create axios instance with common configuration
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Interceptor to add JWT token to all requests
 */
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Authentication API calls
 */
export const authAPI = {
  register: (userData) => apiClient.post("/auth/register", userData),
  login: (credentials) => apiClient.post("/auth/login", credentials),
  getMe: () => apiClient.get("/auth/me"),
  updateProfile: (userData) => apiClient.put("/auth/update", userData),
  changePassword: (passwordData) =>
    apiClient.put("/auth/change-password", passwordData),
};

/**
 * Doctor API calls
 */
export const doctorAPI = {
  getAllDoctors: () => apiClient.get("/doctors"),
  getDoctor: (id) => apiClient.get(`/doctors/${id}`),
  searchDoctors: (query) =>
    apiClient.get("/doctors/search", { params: { query } }),
  addDoctor: (doctorData) => apiClient.post("/doctors", doctorData),
  updateDoctor: (id, doctorData) => apiClient.put(`/doctors/${id}`, doctorData),
  deleteDoctor: (id) => apiClient.delete(`/doctors/${id}`),
};

/**
 * Appointment API calls
 */
export const appointmentAPI = {
  getUserAppointments: () => apiClient.get("/appointments"),
  getAppointment: (id) => apiClient.get(`/appointments/${id}`),
  bookAppointment: (appointmentData) =>
    apiClient.post("/appointments", appointmentData),
  updateAppointment: (id, appointmentData) =>
    apiClient.put(`/appointments/${id}`, appointmentData),
  cancelAppointment: (id) => apiClient.delete(`/appointments/${id}`),
  getAllAppointments: () => apiClient.get("/admin/appointments/admin/all"),
};

/**
 * Admin API calls
 */
export const adminAPI = {
  getAllUsers: () => apiClient.get("/admin/users"),
  getUser: (id) => apiClient.get(`/admin/users/${id}`),
  deleteUser: (id) => apiClient.delete(`/admin/users/${id}`),
};

export default apiClient;
