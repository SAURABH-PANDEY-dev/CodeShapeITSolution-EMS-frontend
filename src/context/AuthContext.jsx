// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser, registerUser } from '../api/expenseApi';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // Initialize state from localStorage on app load
    const [user, setUser] = useState(() => {
        const storedToken = localStorage.getItem('token');
        const storedUserId = localStorage.getItem('user_id');
        const storedUsername = localStorage.getItem('username'); // Keep username for display
        if (storedToken && storedUserId) {
            // Return a user object with at least id and a placeholder username
            return { id: storedUserId, username: storedUsername || 'Authenticated User' };
        }
        return null;
    });
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [loading, setLoading] = useState(true);

    // Set loading to false once initial auth state is determined
    useEffect(() => {
        setLoading(false);
    }, []); // Only run once on mount

    const login = async (credentials) => {
        try {
            const response = await loginUser(credentials);

            // --- MODIFIED DESTRUCTURING HERE ---
            // Match the keys exactly from your backend's JSON response
            const { accessToken, userId } = response.data;

            // Your backend login response currently doesn't send username/email directly.
            // For now, we'll use the email from the login credentials as a temporary "username"
            // or fall back to a generic name.
            // For a more robust solution, ideally your backend's JwtResponse would include
            // the user's email or full name.
            const usernameToStore = credentials.email || 'Authenticated User';

            localStorage.setItem('token', accessToken); // Store the accessToken as 'token'
            localStorage.setItem('user_id', userId);    // Store the userId
            localStorage.setItem('username', usernameToStore); // Store a meaningful username

            setToken(accessToken); // Update token state
            setUser({ id: userId, username: usernameToStore }); // Update user state with ID and username
            return true; // Indicate successful login
        } catch (error) {
            console.error('Login failed:', error.response?.data?.message || error.message);
            throw error; // Re-throw to be caught by the calling component (e.g., LoginPage)
        }
    };

    const register = async (userData) => {
        try {
            const response = await registerUser(userData);
            return response;
        } catch (error) {
            console.error('Registration failed:', error.response?.data?.message || error.message);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('username');
        setToken(null);
        setUser(null);
        // Force a full page reload or navigate to login, as the interceptor might not catch logout instantly
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};