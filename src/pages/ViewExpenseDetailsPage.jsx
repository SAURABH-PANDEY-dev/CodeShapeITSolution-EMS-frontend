// import React, { useEffect, useState } from 'react';
// import {
//     Box, Typography, Button, Snackbar, Alert, Paper
// } from '@mui/material';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
//
// const ViewExpenseDetailsPage = () => {
//     const { expenseId } = useParams();
//     const [expense, setExpense] = useState(null);
//     const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
//
//     useEffect(() => {
//         const fetchExpense = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const res = await axios.get(`http://localhost:8080/api/expenses/${expenseId}`, {
//                     headers: { Authorization: `Bearer ${token}` }
//                 });
//                 setExpense(res.data);
//             } catch (err) {
//                 console.error('Error fetching expense:', err.response?.data || err.message);
//                 setSnackbar({ open: true, message: 'Failed to load expense.', severity: 'error' });
//             }
//         };
//
//         fetchExpense();
//     }, [expenseId]);
//
//     const handleDownload = () => {
//         const token = localStorage.getItem('token');
//         window.open(`http://localhost:8080/api/expenses/${expenseId}/invoice?token=${token}`, '_blank');
//     };
//
//     if (!expense) return null;
//
//     return (
//         <Box sx={{ p: 4 }}>
//             <Typography variant="h5" gutterBottom>Expense Details</Typography>
//             <Paper elevation={3} sx={{ p: 3, maxWidth: 400 }}>
//                 <Typography><strong>Description:</strong> {expense.description}</Typography>
//                 <Typography><strong>Amount:</strong> ${expense.amount}</Typography>
//                 <Typography><strong>Date:</strong> {expense.date?.slice(0, 10)}</Typography>
//                 <Typography><strong>Category:</strong> {expense.category}</Typography>
//
//                 {expense.invoiceFilename && (
//                     <Box sx={{ mt: 2 }}>
//                         <Typography>Invoice File: {expense.invoiceFilename}</Typography>
//                         <Button variant="outlined" onClick={handleDownload} sx={{ mt: 1 }}>
//                             Download Invoice
//                         </Button>
//                     </Box>
//                 )}
//             </Paper>
//
//             <Snackbar
//                 open={snackbar.open}
//                 autoHideDuration={3000}
//                 onClose={() => setSnackbar({ ...snackbar, open: false })}
//             >
//                 <Alert severity={snackbar.severity}>
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>
//         </Box>
//     );
// };
//
// export default ViewExpenseDetailsPage;

// src/pages/ViewExpenseDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ExpensesService from '../services/ExpensesService';
import DeleteExpenseButton from '../components/DeleteExpenseButton';

function ViewExpenseDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [expense, setExpense] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchExpense = async () => {
            try {
                setLoading(true);
                // This assumes your backend has GET /api/expenses/{id}
                // If not, this fetch will fail, and you'd need to fetch all expenses
                // and filter client-side, which is less efficient.
                const response = await ExpensesService.fetchExpenseById(id);
                setExpense(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch expense details.');
                console.error('Error fetching expense details:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchExpense();
    }, [id]);

    const handleExpenseDeleted = () => {
        alert('Expense deleted successfully!');
        navigate('/expenses');
    };

    if (loading) {
        return <div>Loading expense details...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    if (!expense) {
        return <div>Expense not found.</div>;
    }

    return (
        <div>
            <h2>Expense Details</h2>
            <p><strong>Amount:</strong> ${expense.amount ? expense.amount.toFixed(2) : 'N/A'}</p>
            <p><strong>Category:</strong> {expense.category?.name || 'N/A'} (ID: {expense.category?.id || 'N/A'})</p>
            <p><strong>Description:</strong> {expense.description}</p>
            <p><strong>Date:</strong> {expense.date ? new Date(expense.date).toLocaleDateString() : 'N/A'}</p>
            {expense.fileName && (
                <p>
                    <strong>Invoice:</strong>{' '}
                    <a href={`http://localhost:5000/api/expenses/download-invoice/${expense._id}`} target="_blank" rel="noopener noreferrer">
                        {expense.fileName}
                    </a>
                </p>
            )}


            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
                <Link to={`/expenses/update/${expense._id}`} className="btn-warning">
                    Edit
                </Link>
                <DeleteExpenseButton expenseId={expense._id} onDeleteSuccess={handleExpenseDeleted} />
                <Link to="/expenses" className="btn-secondary">
                    Back to List
                </Link>
            </div>
        </div>
    );
}

export default ViewExpenseDetailsPage;