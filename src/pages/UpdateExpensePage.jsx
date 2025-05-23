// // import React, { useEffect, useState } from 'react';
// // import {
// //     Box, TextField, MenuItem, Button, Snackbar, Alert, Typography
// // } from '@mui/material';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// //
// // const UpdateExpensePage = () => {
// //     const { expenseId } = useParams();
// //     const navigate = useNavigate();
// //     const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
// //     const [file, setFile] = useState(null);
// //     const [expense, setExpense] = useState({
// //         description: '',
// //         amount: '',
// //         date: '',
// //         category: '',
// //     });
// //
// //     const handleFileChange = (e) => {
// //         setFile(e.target.files[0]);
// //     };
// //
// //     useEffect(() => {
// //         const fetchExpense = async () => {
// //             try {
// //                 const token = localStorage.getItem('token');
// //                 const res = await axios.get(`http://localhost:8080/api/expenses/${expenseId}`, {
// //                     headers: { Authorization: `Bearer ${token}` }
// //                 });
// //                 setExpense(res.data);
// //             } catch (err) {
// //                 console.error('Error fetching expense:', err.response?.data || err.message);
// //                 setSnackbar({ open: true, message: 'Failed to load expense data.', severity: 'error' });
// //             }
// //         };
// //
// //         fetchExpense();
// //     }, [expenseId]);
// //
// //     const handleChange = (e) => {
// //         setExpense({ ...expense, [e.target.name]: e.target.value });
// //     };
// //
// //     const handleSubmit = async () => {
// //         try {
// //             const token = localStorage.getItem('token');
// //             if (!token) throw new Error('No auth token found');
// //
// //             if (file) {
// //                 // Send multipart form data
// //                 const formData = new FormData();
// //                 formData.append('description', expense.description);
// //                 formData.append('amount', expense.amount);
// //                 formData.append('date', expense.date);
// //                 formData.append('category', expense.category);
// //                 formData.append('file', file);
// //
// //                 await axios.put(`http://localhost:8080/api/expenses/${expenseId}`, formData, {
// //                     headers: {
// //                         Authorization: `Bearer ${token}`,
// //                         'Content-Type': 'multipart/form-data'
// //                     }
// //                 });
// //             } else {
// //                 // Send JSON as before if no file change
// //                 await axios.put(`http://localhost:8080/api/expenses/${expenseId}`, expense, {
// //                     headers: { Authorization: `Bearer ${token}` }
// //                 });
// //             }
// //
// //             setSnackbar({ open: true, message: 'Expense updated successfully.', severity: 'success' });
// //             setTimeout(() => navigate('/dashboard/view-expenses'), 1500);
// //         } catch (err) {
// //             console.error('Update failed:', err.response ? err.response.data : err.message);
// //             setSnackbar({ open: true, message: 'Failed to update expense.', severity: 'error' });
// //         }
// //     };
// //
// //     return (
// //         <Box sx={{ p: 4 }}>
// //             <Typography variant="h5" gutterBottom>Update Expense</Typography>
// //             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
// //                 <TextField
// //                     label="Description"
// //                     name="description"
// //                     value={expense.description}
// //                     onChange={handleChange}
// //                 />
// //                 <TextField
// //                     label="Amount"
// //                     name="amount"
// //                     type="number"
// //                     value={expense.amount}
// //                     onChange={handleChange}
// //                 />
// //                 <TextField
// //                     label="Date"
// //                     name="date"
// //                     type="date"
// //                     InputLabelProps={{ shrink: true }}
// //                     value={expense.date?.slice(0, 10)}
// //                     onChange={handleChange}
// //                 />
// //                 <TextField
// //                     select
// //                     label="Category"
// //                     name="category"
// //                     value={expense.category}
// //                     onChange={handleChange}
// //                 >
// //                     <MenuItem value="TRAVEL">TRAVEL</MenuItem>
// //                     <MenuItem value="FOOD">FOOD</MenuItem>
// //                     <MenuItem value="OFFICE">OFFICE</MenuItem>
// //                     <MenuItem value="OTHER">OTHER</MenuItem>
// //                 </TextField>
// //                 <Typography sx={{ mt: 2 }}>Replace Invoice (PDF, PNG, JPG):</Typography>
// //                 <input
// //                     type="file"
// //                     accept=".pdf,.png,.jpg,.jpeg"
// //                     onChange={handleFileChange}
// //                     style={{ marginTop: '8px', marginBottom: '16px' }}
// //                 />
// //                 <Button variant="contained" color="primary" onClick={handleSubmit}>
// //                     Update Expense
// //                 </Button>
// //             </Box>
// //             <Snackbar
// //                 open={snackbar.open}
// //                 autoHideDuration={3000}
// //                 onClose={() => setSnackbar({ ...snackbar, open: false })}
// //             >
// //                 <Alert severity={snackbar.severity}>
// //                     {snackbar.message}
// //                 </Alert>
// //             </Snackbar>
// //         </Box>
// //     );
// // };
// //
// // export default UpdateExpensePage;
//
// // src/pages/UpdateExpensePage.jsx
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import ExpensesService from '../services/ExpensesService';
//
// function UpdateExpensePage() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         amount: '',
//         categoryId: '', // New field for category ID
//         description: '',
//         date: '',
//     });
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//
//     useEffect(() => {
//         const fetchExpense = async () => {
//             try {
//                 setLoading(true);
//                 const response = await ExpensesService.fetchExpenseById(id);
//                 const expense = response.data;
//                 setFormData({
//                     amount: expense.amount,
//                     categoryId: expense.category?.id || '', // Get category ID from fetched expense
//                     description: expense.description,
//                     date: new Date(expense.date).toISOString().slice(0, 10),
//                 });
//             } catch (err) {
//                 setError(err.response?.data?.message || 'Failed to load expense for editing.');
//                 console.error('Error fetching expense for update:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchExpense();
//     }, [id]);
//
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setSuccess('');
//         try {
//             const dataToSend = {
//                 amount: parseFloat(formData.amount),
//                 description: formData.description,
//                 date: formData.date,
//                 category: { id: formData.categoryId }, // Format category as { id: ... }
//             };
//             await ExpensesService.modifyExpense(id, dataToSend);
//             setSuccess('Expense updated successfully!');
//             setTimeout(() => {
//                 navigate(`/expenses/${id}`);
//             }, 1500);
//         } catch (err) {
//             setError(err.response?.data?.message || 'Failed to update expense. Please try again.');
//             console.error('Error updating expense:', err);
//         }
//     };
//
//     if (loading) {
//         return <div>Loading expense data...</div>;
//     }
//
//     if (error && !formData.amount) {
//         return <div className="error-message">Error: {error}</div>;
//     }
//
//     return (
//         <div>
//             <h2>Update Expense</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="amount">Amount ($):</label>
//                     <input
//                         type="number"
//                         id="amount"
//                         name="amount"
//                         value={formData.amount}
//                         onChange={handleChange}
//                         required
//                         step="0.01"
//                         min="0"
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="categoryId">Category ID:</label> {/* Temporarily using ID directly */}
//                     <input
//                         type="number"
//                         id="categoryId"
//                         name="categoryId"
//                         value={formData.categoryId}
//                         onChange={handleChange}
//                         required
//                         placeholder="e.g., 1, 2, 3"
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="description">Description:</label>
//                     <textarea
//                         id="description"
//                         name="description"
//                         value={formData.description}
//                         onChange={handleChange}
//                         rows="4"
//                     ></textarea>
//                 </div>
//                 <div>
//                     <label htmlFor="date">Date:</label>
//                     <input
//                         type="date"
//                         id="date"
//                         name="date"
//                         value={formData.date}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 {error && <p className="error-message">{error}</p>}
//                 {success && <p className="success-message">{success}</p>}
//                 <div style={{ display: 'flex', gap: '10px' }}>
//                     <button type="submit" className="btn-primary">Update Expense</button>
//                     <button type="button" onClick={() => navigate(-1)} className="btn-secondary">
//                         Cancel
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }
//
// export default UpdateExpensePage;

// src/pages/UpdateExpensePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ExpensesService from '../services/ExpensesService';

function UpdateExpensePage() {
    const { id } = useParams(); // Get the expense ID from the URL
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        amount: '',
        category: '',
        description: '',
        date: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Fetch expense data when the component mounts or ID changes
    useEffect(() => {
        const fetchExpense = async () => {
            try {
                setLoading(true);
                const response = await ExpensesService.fetchExpenseById(id);
                const expense = response.data;
                setFormData({
                    amount: expense.amount,
                    category: expense.category,
                    description: expense.description,
                    // Format date to 'YYYY-MM-DD' for HTML date input
                    date: new Date(expense.date).toISOString().slice(0, 10),
                });
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to load expense for editing.');
                console.error('Error fetching expense for update:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchExpense();
    }, [id]); // Re-run effect if ID changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            // Ensure amount is parsed as a number
            const dataToSend = { ...formData, amount: parseFloat(formData.amount) };
            await ExpensesService.modifyExpense(id, dataToSend);
            setSuccess('Expense updated successfully!');
            setTimeout(() => {
                navigate(`/expenses/${id}`); // Redirect to expense details page
            }, 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update expense. Please try again.');
            console.error('Error updating expense:', err);
        }
    };

    if (loading) {
        return <div>Loading expense data...</div>;
    }

    if (error && !formData.amount) { // Show error if initial fetch failed and form data is not loaded
        return <div className="error-message">Error: {error}</div>;
    }

    return (
        <div>
            <h2>Update Expense</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="amount">Amount ($):</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        required
                        step="0.01"
                        min="0"
                    />
                </div>
                <div>
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" className="btn-primary">Update Expense</button>
                    <button type="button" onClick={() => navigate(-1)} className="btn-secondary">
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdateExpensePage;