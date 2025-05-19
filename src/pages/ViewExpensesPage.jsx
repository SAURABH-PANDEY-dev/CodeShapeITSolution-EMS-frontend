import React, { useEffect, useState } from 'react';
import {
    Box, Typography, Paper, List, ListItem, ListItemText,
    IconButton, Divider, ListItemSecondaryAction, Snackbar, Alert
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TextField, MenuItem, Button } from '@mui/material';


const ViewExpensesPage = () => {
    const [expenses, setExpenses] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [category, setCategory] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const token = localStorage.getItem('token');
                const res = await axios.get(`http://localhost:8080/api/expenses/user/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setExpenses(res.data);
            } catch (err) {
                console.error('Error fetching expenses:', err);
            }
        };
        fetchExpenses();
    }, []);

    const handleDelete = async (expenseId) => {
        if (!window.confirm('Are you sure you want to delete this expense?')) return;

        try {
            await axios.delete(`http://localhost:8080/api/expenses/${expenseId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setExpenses(expenses.filter((e) => e.id !== expenseId));
            setSnackbar({ open: true, message: 'Expense deleted successfully.', severity: 'success' });
        } catch (err) {
            console.error(err);
            setSnackbar({ open: true, message: 'Failed to delete expense.', severity: 'error' });
        }
    };

    const handleFilter = async () => {
        if (!startDate || !endDate) {
            alert('Please select both start and end dates.');
            return;
        }

        try {
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');
            const res = await axios.get(
                `http://localhost:8080/api/expenses/user/${userId}/filter-by-date`,
                {
                    params: { startDate, endDate },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setExpenses(res.data);
        } catch (err) {
            console.error('Error filtering expenses:', err);
            alert('Failed to filter expenses by date');
        }
    };

    const handleCategoryFilter = async () => {
        if (!category) {
            alert('Please select a category.');
            return;
        }

        try {
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');
            const res = await axios.get(
                `http://localhost:8080/api/expenses/user/${userId}/filter-by-category`,
                {
                    params: { category },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setExpenses(res.data);
        } catch (err) {
            console.error('Error filtering by category:', err);
            alert('Failed to filter expenses by category');
        }
    };

    const handleClearFilters = async () => {
        setStartDate('');
        setEndDate('');
        setCategory('');

        try {
            const userId = localStorage.getItem('userId');
            const token = localStorage.getItem('token');
            const res = await axios.get(`http://localhost:8080/api/expenses/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setExpenses(res.data);
        } catch (err) {
            console.error('Error clearing filters:', err);
            alert('Failed to reload expenses');
        }
    };



    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>
                Your Expenses
            </Typography>
            <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
                <TextField
                    label="Start Date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="End Date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
                <Button
                    variant="outlined"
                    onClick={handleFilter}
                    sx={{ alignSelf: 'center', height: '100%' }}
                >
                    Filter
                </Button>
            </Box>
            <Box sx={{ mb: 3 }}>
                <Button variant="contained" color="secondary" onClick={handleClearFilters}>
                    Clear Filters
                </Button>
            </Box>

            <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
                <TextField
                    select
                    label="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    sx={{ minWidth: 200 }}
                >
                    <MenuItem value="">-- Select Category --</MenuItem>
                    <MenuItem value="TRAVEL">TRAVEL</MenuItem>
                    <MenuItem value="FOOD">FOOD</MenuItem>
                    <MenuItem value="OFFICE">OFFICE</MenuItem>
                    <MenuItem value="OTHER">OTHER</MenuItem>
                </TextField>
                <Button
                    variant="outlined"
                    onClick={handleCategoryFilter}
                    sx={{ alignSelf: 'center', height: '100%' }}
                >
                    Filter
                </Button>
            </Box>

            <Paper>
                <List>
                    {expenses.map((expense) => (
                        <React.Fragment key={expense.id}>
                            <ListItem>
                                <ListItemText
                                    primary={`${expense.description} - ₹${expense.amount}`}
                                    secondary={`${expense.date} (${expense.category})`}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton
                                        edge="end"
                                        onClick={() => navigate(`/update-expense/${expense.id}`)}
                                    >
                                        <Edit />
                                    </IconButton>
                                    <IconButton
                                        edge="end"
                                        color="error"
                                        onClick={() => handleDelete(expense.id)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
            </Paper>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ViewExpensesPage;
