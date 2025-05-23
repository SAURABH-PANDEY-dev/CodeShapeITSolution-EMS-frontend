// import axios from 'axios';
//
// const API_URL = 'http://localhost:8080/api/expenses';
//
// export const deleteExpense = async (expenseId, token) => {
//     return axios.delete(`${API_URL}/${expenseId}`, {
//         headers: { Authorization: `Bearer ${token}` }
//     });
// };

// src/api/expenseApi.js
import axiosInstance from './axiosInstance';

// --- Authentication Endpoints ---
export const registerUser = (userData) => {
    // Backend: POST /api/users (expects { fullName, email, password })
    return axiosInstance.post('/users', userData);
};

export const loginUser = (credentials) => {
    // Backend: POST /api/users/login (expects { email, password })
    return axiosInstance.post('/users/login', credentials);
};

// --- Expense Endpoints ---
export const getAllExpenses = (userId, pageNo = 0, pageSize = 10, sortBy = 'date', sortDir = 'desc') => {
    // Backend: GET /api/expenses (expects principal, returns Page object)
    // We'll use the authenticated user's principal on backend, so no userId in path for ALL.
    // Pagination parameters are added here.
    return axiosInstance.get('/expenses', {
        params: { pageNo, pageSize, sortBy, sortDir }
    });
};

export const getExpenseById = (id) => {
    // Backend: Currently has no GET /api/expenses/{id} directly.
    // If you add it (recommended), this API call will work.
    // For now, if no direct endpoint, the frontend pages will need to fetch all and filter.
    // Assuming you will add GET /api/expenses/{id}
    return axiosInstance.get(`/expenses/${id}`);
};

export const createExpense = (userId, expenseData) => {
    // Backend: POST /api/expenses/user/{userId}
    // ExpenseData must include { amount, description, date, category: { id: categoryId } }
    return axiosInstance.post(`/expenses/user/${userId}`, expenseData);
};

export const updateExpense = (id, updatedExpenseData) => {
    // Backend: PUT /api/expenses/{expenseId}
    // updatedExpenseData must include { amount, description, date, category: { id: categoryId } }
    return axiosInstance.put(`/expenses/${id}`, updatedExpenseData);
};

export const deleteExpense = (id) => {
    // Backend: DELETE /api/expenses/{expenseId}
    return axiosInstance.delete(`/expenses/${id}`);
};