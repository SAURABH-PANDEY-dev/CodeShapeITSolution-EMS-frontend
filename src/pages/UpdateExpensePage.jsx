import React, { useEffect, useState } from 'react';
import {
    Box, TextField, MenuItem, Button, Snackbar, Alert, Typography
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateExpensePage = () => {
    const { expenseId } = useParams();
    const navigate = useNavigate();
    const [expense, setExpense] = useState({
        description: '',
        amount: '',
        date: '',
        category: '',
    });
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    useEffect(() => {
        const fetchExpense = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get(`http://localhost:8080/api/expenses/user/${localStorage.getItem('userId')}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const found = res.data.find(e => e.id.toString() === expenseId);
                if (found) setExpense(found);
                else throw new Error('Expense not found');
            } catch (err) {
                console.error('Error fetching expense:', err.response?.data || err.message);
                setSnackbar({ open: true, message: 'Failed to load expense data.', severity: 'error' });
            }
        };

        fetchExpense();
    }, [expenseId]);

    const handleChange = (e) => {
        setExpense({ ...expense, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const token = localStorage.getItem('token');
            console.log('Token sent for update:', token);  // <-- Add this log

            if (!token) throw new Error('No auth token found');

            await axios.put(`http://localhost:8080/api/expenses/${expenseId}`, expense, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSnackbar({ open: true, message: 'Expense updated successfully.', severity: 'success' });
            setTimeout(() => navigate('/dashboard/view-expenses'), 1500);
        } catch (err) {
            console.error('Update failed:', err.response ? err.response.data : err.message);
            setSnackbar({ open: true, message: 'Failed to update expense.', severity: 'error' });
        }
    };



    return (
        <Box sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom>Update Expense</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
                <TextField
                    label="Description"
                    name="description"
                    value={expense.description}
                    onChange={handleChange}
                />
                <TextField
                    label="Amount"
                    name="amount"
                    type="number"
                    value={expense.amount}
                    onChange={handleChange}
                />
                <TextField
                    label="Date"
                    name="date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={expense.date?.slice(0, 10)}
                    onChange={handleChange}
                />
                <TextField
                    select
                    label="Category"
                    name="category"
                    value={expense.category}
                    onChange={handleChange}
                >
                    <MenuItem value="TRAVEL">TRAVEL</MenuItem>
                    <MenuItem value="FOOD">FOOD</MenuItem>
                    <MenuItem value="OFFICE">OFFICE</MenuItem>
                    <MenuItem value="OTHER">OTHER</MenuItem>
                </TextField>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Update Expense
                </Button>
            </Box>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default UpdateExpensePage;
