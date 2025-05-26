// src/utils/api.js
import axios from "axios";

// Create an Axios instance with custom config
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  withCredentials: true, // Enable if backend uses cookies or sessions
  headers: {
    "Content-Type": "application/json",
  },
});

// Optional: Global response error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can log or show notifications here
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
