import React, { useState } from 'react';
import {
    Box, Paper, TextField, Button, Typography, MenuItem
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const categories = ['TRAVEL', 'FOOD', 'OFFICE', 'OTHER'];

const CreateExpensePage = () => {
    const [expense, setExpense] = useState({
        description: '',
        amount: '',
        date: '',
        category: 'OTHER'
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setExpense(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');

        try {
            await axios.post(`http://localhost:8080/api/expenses/user/${userId}`, expense, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            alert('Expense created successfully');
            navigate('/dashboard');
        } catch (err) {
            alert('Failed to create expense');
            console.error(err);
        }
    };

    return (
        <Box
            sx={{
                height: '80vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Paper sx={{ p: 4, width: 400 }}>
                <Typography variant="h6" align="center" gutterBottom>
                    Create Expense
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Description"
                        name="description"
                        fullWidth
                        margin="normal"
                        value={expense.description}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Amount"
                        name="amount"
                        type="number"
                        fullWidth
                        margin="normal"
                        value={expense.amount}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        label="Date"
                        name="date"
                        type="date"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        value={expense.date}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        select
                        label="Category"
                        name="category"
                        fullWidth
                        margin="normal"
                        value={expense.category}
                        onChange={handleChange}
                        required
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat} value={cat}>
                                {cat}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                        Create Expense
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default CreateExpensePage;
