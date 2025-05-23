// import axios from 'axios';
//
// // Create an Axios instance with base backend URL
// const axiosInstance = axios.create({
//     baseURL: 'http://localhost:8080/api', // change if your backend URL differs
// });
//
// // Add a request interceptor to include JWT token automatically
// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token'); // assuming you store JWT token in localStorage
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );
//
// export default axiosInstance;
// src/api/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api', // ***** IMPORTANT: REPLACE WITH YOUR ACTUAL BACKEND URL *****
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add the auth token to headers
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling token expiration/invalidity
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        // Check if the error is 401 Unauthorized and it's not a retry attempt
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Mark as retried to prevent infinite loops

            // For simplicity, we'll just log out the user.
            // In a more complex app, you might try to refresh the token here.
            localStorage.removeItem('token');
            localStorage.removeItem('username'); // Also clear any stored username
            console.log('Token expired or invalid. Logging out and redirecting to login.');
            // Redirect to login page - this needs to be handled carefully in React Router
            // A full refresh or using the `Maps` hook from AuthContext might be better
            window.location.href = '/login'; // This will force a full page reload and redirect
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;