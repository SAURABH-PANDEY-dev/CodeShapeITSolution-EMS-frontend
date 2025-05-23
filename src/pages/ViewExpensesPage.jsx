// import React, { useEffect, useState } from 'react';
// import {
//     Box, Typography, Paper, List, ListItem, ListItemText,
//     IconButton, Divider, ListItemSecondaryAction, Snackbar, Alert
// } from '@mui/material';
// import { Edit, Delete } from '@mui/icons-material';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { TextField, MenuItem, Button } from '@mui/material';
// import DeleteExpenseButton from "../components/DeleteExpenseButton.jsx";
//
//
// const ViewExpensesPage = () => {
//     const [expenses, setExpenses] = useState([]);
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');
//     const [category, setCategory] = useState('');
//     const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
//     const navigate = useNavigate();
//
//     useEffect(() => {
//         const fetchExpenses = async () => {
//             try {
//                 const userId = localStorage.getItem('userId');
//                 const token = localStorage.getItem('token');
//                 const res = await axios.get(`http://localhost:8080/api/expenses/user/${userId}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 setExpenses(res.data);
//             } catch (err) {
//                 console.error('Error fetching expenses:', err);
//             }
//         };
//         fetchExpenses();
//     }, []);
//
//     const handleDelete = async (expenseId) => {
//         if (!window.confirm('Are you sure you want to delete this expense?')) return;
//
//         try {
//             await axios.delete(`http://localhost:8080/api/expenses/${expenseId}`, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });
//             setExpenses(expenses.filter((e) => e.id !== expenseId));
//             setSnackbar({ open: true, message: 'Expense deleted successfully.', severity: 'success' });
//         } catch (err) {
//             console.error(err);
//             setSnackbar({ open: true, message: 'Failed to delete expense.', severity: 'error' });
//         }
//     };
//
//     const handleFilter = async () => {
//         if (!startDate || !endDate) {
//             alert('Please select both start and end dates.');
//             return;
//         }
//
//         try {
//             const userId = localStorage.getItem('userId');
//             const token = localStorage.getItem('token');
//             const res = await axios.get(
//                 `http://localhost:8080/api/expenses/user/${userId}/filter-by-date`,
//                 {
//                     params: { startDate, endDate },
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//             setExpenses(res.data);
//         } catch (err) {
//             console.error('Error filtering expenses:', err);
//             alert('Failed to filter expenses by date');
//         }
//     };
//
//     const handleCategoryFilter = async () => {
//         if (!category) {
//             alert('Please select a category.');
//             return;
//         }
//
//         try {
//             const userId = localStorage.getItem('userId');
//             const token = localStorage.getItem('token');
//             const res = await axios.get(
//                 `http://localhost:8080/api/expenses/user/${userId}/filter-by-category`,
//                 {
//                     params: { category },
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//             setExpenses(res.data);
//         } catch (err) {
//             console.error('Error filtering by category:', err);
//             alert('Failed to filter expenses by category');
//         }
//     };
//
//     const handleClearFilters = async () => {
//         setStartDate('');
//         setEndDate('');
//         setCategory('');
//
//         try {
//             const userId = localStorage.getItem('userId');
//             const token = localStorage.getItem('token');
//             const res = await axios.get(`http://localhost:8080/api/expenses/user/${userId}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             setExpenses(res.data);
//         } catch (err) {
//             console.error('Error clearing filters:', err);
//             alert('Failed to reload expenses');
//         }
//     };
//
//     return (
//         <Box sx={{ p: 4 }}>
//             <Typography variant="h5" gutterBottom>
//                 Your Expenses
//             </Typography>
//
//             <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
//                 <TextField
//                     label="Start Date"
//                     type="date"
//                     value={startDate}
//                     onChange={(e) => setStartDate(e.target.value)}
//                     InputLabelProps={{ shrink: true }}
//                 />
//                 <TextField
//                     label="End Date"
//                     type="date"
//                     value={endDate}
//                     onChange={(e) => setEndDate(e.target.value)}
//                     InputLabelProps={{ shrink: true }}
//                 />
//                 <Button
//                     variant="outlined"
//                     onClick={handleFilter}
//                     sx={{ alignSelf: 'center', height: '100%' }}
//                 >
//                     Filter by Date
//                 </Button>
//             </Box>
//
//             <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
//                 <TextField
//                     select
//                     label="Category"
//                     value={category}
//                     onChange={(e) => setCategory(e.target.value)}
//                     sx={{ minWidth: 200 }}
//                 >
//                     <MenuItem value="">-- Select Category --</MenuItem>
//                     <MenuItem value="TRAVEL">TRAVEL</MenuItem>
//                     <MenuItem value="FOOD">FOOD</MenuItem>
//                     <MenuItem value="OFFICE">OFFICE</MenuItem>
//                     <MenuItem value="OTHER">OTHER</MenuItem>
//                 </TextField>
//                 <Button
//                     variant="outlined"
//                     onClick={handleCategoryFilter}
//                     sx={{ alignSelf: 'center', height: '100%' }}
//                 >
//                     Filter by Category
//                 </Button>
//             </Box>
//
//             <Box sx={{ mb: 3 }}>
//                 <Button variant="contained" color="secondary" onClick={handleClearFilters}>
//                     Clear Filters
//                 </Button>
//             </Box>
//
//             <Paper>
//                 <List>
//                     {expenses.map((expense) => (
//                         <React.Fragment key={expense.id}>
//                             <ListItem>
//                                 <ListItemText
//                                     primary={`${expense.description} - ₹${expense.amount}`}
//                                     secondary={`${expense.date} (${expense.category})`}
//                                 />
//                                 <ListItemSecondaryAction>
//                                     <Button
//                                         size="small"
//                                         variant="outlined"
//                                         sx={{ mr: 1 }}
//                                         onClick={() => navigate(`/expenses/${expense.id}`)}
//                                     >
//                                         View
//                                     </Button>
//                                     <IconButton
//                                         edge="end"
//                                         onClick={() => navigate(`/update-expense/${expense.id}`)}
//                                     >
//                                         <Edit />
//                                     </IconButton>
//                                     <IconButton
//                                         edge="end"
//                                         color="error"
//                                         onClick={() => handleDelete(expense.id)}
//                                     >
//                                         <Delete />
//                                     </IconButton>
//                                 </ListItemSecondaryAction>
//
//                             </ListItem>
//                             <Divider />
//                         </React.Fragment>
//                     ))}
//                 </List>
//             </Paper>
//
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
// export default ViewExpensesPage;


// src/pages/ViewExpensesPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ExpensesService from '../services/ExpensesService';
import DeleteExpenseButton from '../components/DeleteExpenseButton';

function ViewExpensesPage() {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [pageInfo, setPageInfo] = useState({
        pageNo: 0,
        pageSize: 10,
        sortBy: 'date',
        sortDir: 'desc',
        totalPages: 0,
        totalElements: 0,
    });

    // Function to fetch expenses from the backend
    const fetchExpenses = async () => {
        try {
            setLoading(true);
            const response = await ExpensesService.fetchAllExpenses(
                pageInfo.pageNo,
                pageInfo.pageSize,
                pageInfo.sortBy,
                pageInfo.sortDir
            );
            // Your backend returns a Page object, so access the 'content' array
            setExpenses(response.data.content);
            setPageInfo(prev => ({
                ...prev,
                totalPages: response.data.totalPages,
                totalElements: response.data.totalElements,
                pageNo: response.data.number, // Current page number from backend
            }));
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch expenses.');
            console.error('Error fetching expenses:', err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch expenses when the component mounts or pageInfo changes
    useEffect(() => {
        fetchExpenses();
    }, [pageInfo.pageNo, pageInfo.pageSize, pageInfo.sortBy, pageInfo.sortDir]); // Re-fetch when pagination/sort changes

    // Callback function to update the list after an expense is deleted
    const handleExpenseDeleted = (deletedId) => {
        // A simple refresh of the current page
        fetchExpenses();
    };

    const handlePageChange = (newPageNo) => {
        setPageInfo(prev => ({ ...prev, pageNo: newPageNo }));
    };

    if (loading) {
        return <div>Loading expenses...</div>;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    if (expenses.length === 0 && pageInfo.totalElements === 0) {
        return (
            <div>
                <h2>All Expenses</h2>
                <p>No expenses found. <Link to="/expenses/create">Create one!</Link></p>
            </div>
        );
    }

    return (
        <div>
            <h2>All Expenses</h2>
            <table>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {expenses.map((expense) => (
                    <tr key={expense._id}>
                        <td>{new Date(expense.date).toLocaleDateString()}</td>
                        <td>${expense.amount.toFixed(2)}</td>
                        <td>{expense.category?.name || 'N/A'}</td> {/* Access category name if available */}
                        <td>{expense.description}</td>
                        <td>
                            <Link to={`/expenses/${expense._id}`} style={{ marginRight: '10px' }} className="btn-secondary">View</Link>
                            <Link to={`/expenses/update/${expense._id}`} style={{ marginRight: '10px' }} className="btn-warning">Edit</Link>
                            <DeleteExpenseButton expenseId={expense._id} onDeleteSuccess={handleExpenseDeleted} />
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Basic Pagination Controls (can be enhanced) */}
            <div style={{ marginTop: '22px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <button
                    onClick={() => handlePageChange(pageInfo.pageNo - 1)}
                    disabled={pageInfo.pageNo === 0}
                    className="btn-secondary"
                >
                    Previous
                </button>
                <span>
          Page {pageInfo.pageNo + 1} of {pageInfo.totalPages} ({pageInfo.totalElements} items)
        </span>
                <button
                    onClick={() => handlePageChange(pageInfo.pageNo + 1)}
                    disabled={pageInfo.pageNo >= pageInfo.totalPages - 1}
                    className="btn-secondary"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default ViewExpensesPage;