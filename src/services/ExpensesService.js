import { getAllExpenses, getExpenseById, createExpense, updateExpense, deleteExpense } from '../api/expenseApi';
import axiosInstance from "../api/axiosInstance.js";

const ExpensesService = {
    fetchAllExpenses: (params) => {
        return getAllExpenses(params);
    },
    fetchExpenseById: (id) => {
        return getExpenseById(id);
    },
    addExpense: (expenseData) => {
        return createExpense(expenseData);
    },
    modifyExpense: (id, expenseData) => {
        return updateExpense(id, expenseData);
    },
    removeExpense: (id) => {
        return deleteExpense(id);
    },
    fetchExpenseCategories: async () => {
        const response = await axiosInstance.get('/expenses/categories');
        return response.data;  // Axios auto-parses JSON
    },
    addExpenseMultipart: (userId, formData) => {
        return axiosInstance.post(`/expenses/user/${userId}/multipart`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => response.data);
    },
};

export default ExpensesService;
