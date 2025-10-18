<<<<<<< HEAD

import axios from 'axios';

// 🚀 FIX: Define API_BASE_URL so it's accessible to all functions
// This uses the Vite environment variable (VITE_BACKEND_URL) or defaults to localhost:4028
=======
import axios from 'axios';

// 🚀 FIX: Define API_BASE_URL so it's accessible to all functions
>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4028";

// Create an Axios instance for API requests
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to automatically attach the auth token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
<<<<<<< HEAD

  // --- 🚀 DIAGNOSTIC LOGGING ---
  console.log(`[Frontend] Intercepting request to: ${config.url}`);
  if (token) {
    console.log('[Frontend] Token found in localStorage. Attaching to headers.');
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.log('[Frontend] No token found in localStorage.');
  }
  // --- END LOGGING ---
  
  return config;
});

// Response interceptor for basic error handling (REFRESH LOGIC REMOVED)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // If a 401 now occurs, it leads directly to logout/error state
=======
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for basic error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8
    const message =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error?.message ||
      "Something went wrong!";
    return Promise.reject({ ...error, message });
  }
);


// --- AUTHENTICATION API ---

export const registerUser = (userData) => {
  return axiosInstance.post("/api/auth/register", userData);
};

export const loginUser = (credentials) => {
  return axiosInstance.post("/api/auth/login", credentials);
};

export const getMe = () => {
  return axiosInstance.get("/api/auth/me");
};

export const createProfile = (profileData) => {
  return axiosInstance.post('/api/auth/create-profile', profileData);
};

export const verifyEmail = (payload) => {
  return axiosInstance.post(`/api/auth/verify-email`, payload);
};

export const resendVerificationEmail = (email) => {
  return axiosInstance.post("/api/auth/send-verification", { email });
};

export const forgotPassword = (payload) => {
  return axiosInstance.post('/api/auth/forgot-password', payload);
};

export const resetPassword = (data) => {
  return axiosInstance.post('/api/auth/reset-password', data);
};

<<<<<<< HEAD
// <<< NEW STABLE IMAGE UPLOAD FUNCTION >>>
export const uploadProfilePicture = (file) => {
  const formData = new FormData();
  // 'profilePicture' must match the multer field name in the backend
  formData.append('profilePicture', file); 

  // Create a separate axios instance to correctly handle file headers
  return axios.create({
    baseURL: API,
=======
export const uploadProfilePicture = (file) => {
  const formData = new FormData();
  formData.append('profilePicture', file); 

  return axios.create({
    baseURL: API_BASE_URL, 
>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data', 
      'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
    },
<<<<<<< HEAD
  }).post('/api/auth/profile/upload-picture', formData);
};
// <<< END NEW FUNCTION >>>
=======
  }).post('/api/coach/profile/upload-picture', formData); 
};
>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8

export const logoutUser = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("user");
  localStorage.removeItem("rememberMe");
};

<<<<<<< HEAD

// --- EVENTS & BOOKINGS API ---

export const getEvents = () => {
  return axiosInstance.get("/api/events");
};

export const getMyEvents = () => {
  return axiosInstance.get("/api/events/my-events");
};

export const createEvent = (eventData) => {
  return axiosInstance.post("/api/events", eventData);
};

export const updateEvent = (eventId, eventData) => {
  return axiosInstance.put(`/api/events/${eventId}`, eventData);
};

export const deleteEvent = (eventId) => {
  return axiosInstance.delete(`/api/events/${eventId}`);
};

export const bookEvent = (eventId) => {
  return axiosInstance.post(`/api/events/${eventId}/book`);
};

export const getMyBookings = () => {
  return axiosInstance.get("/api/events/my-bookings");
=======
export const getMyClientSessions = () => {
  // This corresponds to the backend route /api/events/my-bookings which is now session-only for clients
  return axiosInstance.get("/api/bookings/client-sessions")
};

// FIX: Coach's Bookings (NEW Export - Fixes the error in BookingManagement.jsx)
export const getMyCoachBookings = () => {
    // This corresponds to the backend route /api/coach/my-bookings
    return axiosInstance.get("/api/coach/my-bookings"); 
>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8
};


// --- PROFILES API ---

export const getAllCoaches = (searchTerm = '', audience = '') => {
  return axiosInstance.get(`/api/profiles/coaches`, {
    params: {
      search: searchTerm,
      audience: audience,
    }
  });
};

export const getCoachById = (coachId) => {
<<<<<<< HEAD
  // We established the route /api/coach/public/:coachId for public profiles
  return axiosInstance.get(`/api/coach/public/${coachId}`); 
};


=======
  return axiosInstance.get(`/api/coach/public/${coachId}`); 
};

>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8
export const getMyClients = () => {
  return axiosInstance.get('/api/profiles/my-clients');
};

<<<<<<< HEAD
// *** CRITICAL FIX APPLIED HERE: PATH CHANGED TO 'api/coach/profile/add-item' ***
export const addProfileItem = (payload) => {
  // Remove the leading slash to ensure correct path concatenation with baseURL
=======
export const addProfileItem = (payload) => {
>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8
  return axiosInstance.post('api/coach/profile/add-item', payload); 
};

export const removeProfileItem = (payload) => {
<<<<<<< HEAD
  // Remove the leading slash to ensure correct path concatenation with baseURL
  return axiosInstance.post('api/coach/profile/remove-item', payload); 
};

// FIX 1: UPDATE PROFILE TO USE DEDICATED COACH ROUTE
export const updateUserProfile = (profileData) => {
  // Keep leading slash as it seems to work for dedicated routes
  return axiosInstance.put('/api/coach/profile', profileData);
};

// FIX 2: ADD DEDICATED FETCH FUNCTION
export const getCoachProfile = () => {
  // Keep leading slash as it seems to work for dedicated routes
  return axiosInstance.get("/api/coach/profile");
};

// =========================================================
// SESSION MANAGEMENT FUNCTIONS
// =========================================================

export const createSession = async (sessionData) => {
    return axios.post(`${API_BASE_URL}/api/coach/sessions`, sessionData, {
        withCredentials: true, // <-- CRITICAL FIX
    });
};

export const updateSession = async (sessionId, sessionData) => {
    return axios.put(`${API_BASE_URL}/api/coach/sessions/${sessionId}`, sessionData, {
        withCredentials: true, // <-- CRITICAL FIX
    });
};

export const deleteSession = async (sessionId) => {
    return axios.delete(`${API_BASE_URL}/api/coach/sessions/${sessionId}`, {
        withCredentials: true, // <-- CRITICAL FIX
    });
=======
  return axiosInstance.post('api/coach/profile/remove-item', payload); 
};

export const updateUserProfile = (profileData) => {
  const isFormData = profileData instanceof FormData;
  
  const config = {};
  if (isFormData) {
    config.headers = {
        'Content-Type': undefined 
    };
  }
  return axiosInstance.put('/api/coach/profile', profileData, config);
};

export const getCoachProfile = () => {
  return axiosInstance.get("/api/coach/profile");
};

// --- CLIENT PROFILES API (NEW) ---

export const updateClientProfile = (profileData) => {
  // Sends JSON data to the PUT /api/client/profile endpoint
  return axiosInstance.put('/api/client/profile', profileData);
};

export const uploadClientProfilePicture = (file) => {
  const formData = new FormData();
  formData.append('profilePicture', file); 

  // Use custom Axios instance for multipart/form-data upload
  return axios.create({
    baseURL: API_BASE_URL, 
    withCredentials: true,
    headers: {
      'Content-Type': 'multipart/form-data', 
      'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
    },
  }).post('/api/client/profile/upload-picture', formData); 
};


// =========================================================
// SESSION MANAGEMENT FUNCTIONS (Fixed to use axiosInstance)
// =========================================================

export const createSession = async (sessionData) => {
    // FIX: Using axiosInstance and relying on the request interceptor for auth
    return axiosInstance.post(`/api/coach/sessions`, sessionData);
};

export const updateSession = async (sessionId, sessionData) => {
    // FIX: Using axiosInstance
    return axiosInstance.put(`/api/coach/sessions/${sessionId}`, sessionData);
};

export const deleteSession = async (sessionId) => {
    // FIX: Using axiosInstance
    return axiosInstance.delete(`/api/coach/sessions/${sessionId}`);
};

// Client books a session
export const bookSession = async (sessionId) => {
    return axiosInstance.post(`/api/coach/public/${sessionId}/book`);
};

// Get clients who follow the logged-in coach
export const getClientsWhoFollow = () => {
    return axiosInstance.get('/api/coach/clients-who-follow');
>>>>>>> 5039cd610e06de8f0bd147ed13e01745ccf702e8
};