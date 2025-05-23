// // src/pages/ExpenseDetailsPage.jsx
// import React, { useEffect, useState } from 'react';
// import {
//     Box, Typography, CircularProgress, Paper, Divider, Button, Snackbar, Alert
// } from '@mui/material';
// import { useParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';
//
// const ExpenseDetailsPage = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [expense, setExpense] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
//
//     useEffect(() => {
//         const fetchExpense = async () => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const res = await axios.get(`http://localhost:8080/api/expenses/${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 setExpense(res.data);
//             } catch (err) {
//                 console.error('Error fetching expense:', err);
//                 setSnackbar({ open: true, message: 'Failed to load expense', severity: 'error' });
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchExpense();
//     }, [id]);
//
//     const handleDownload = () => {
//         window.open(`http://localhost:8080/api/expenses/${id}/invoice`, '_blank');
//     };
//
//     if (loading) {
//         return (
//             <Box sx={{ p: 4, textAlign: 'center' }}>
//                 <CircularProgress />
//                 <Typography variant="body1" mt={2}>Loading expense details...</Typography>
//             </Box>
//         );
//     }
//
//     if (!expense) {
//         return (
//             <Box sx={{ p: 4 }}>
//                 <Typography variant="h6">Expense not found.</Typography>
//             </Box>
//         );
//     }
//
//     return (
//         <Box sx={{ p: 4 }}>
//             <Typography variant="h5" gutterBottom>
//                 Expense Details
//             </Typography>
//             <Paper sx={{ p: 3 }}>
//                 <Typography><strong>Description:</strong> {expense.description}</Typography>
//                 <Typography><strong>Amount:</strong> ₹{expense.amount}</Typography>
//                 <Typography><strong>Date:</strong> {expense.date}</Typography>
//                 <Typography><strong>Category:</strong> {expense.category}</Typography>
//                 <Divider sx={{ my: 2 }} />
//                 <Typography><strong>Invoice File:</strong> {expense.invoiceFilename || 'No file uploaded'}</Typography>
//                 {expense.invoiceFilename && (
//                     <Button variant="outlined" sx={{ mt: 2 }} onClick={handleDownload}>
//                         Download Invoice
//                     </Button>
//                 )}
//             </Paper>
//             <Box sx={{ mt: 3 }}>
//                 <Button variant="contained" onClick={() => navigate(-1)}>Back</Button>
//             </Box>
//             <Snackbar
//                 open={snackbar.open}
//                 autoHideDuration={3000}
//                 onClose={() => setSnackbar({ ...snackbar, open: false })}
//             >
//                 <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>
//         </Box>
//     );
// };
//
// export default ExpenseDetailsPage;

// src/pages/ExpenseDetailsPage.jsx
// This file seems redundant given ViewExpenseDetailsPage.jsx.
// It will remain empty or can be deleted if not intended for a separate purpose.
import React from 'react';

function ExpenseDetailsPage() {
    return (
        <div>
            <h3>Expense Details Page (Placeholder)</h3>
            <p>
                If you're looking for expense details, please check{' '}
                <code>src/pages/ViewExpenseDetailsPage.jsx</code>.
            </p>
        </div>
    );
}

export default ExpenseDetailsPage;