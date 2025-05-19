import React, { useState } from 'react';
import {
    Typography, Button, Box, AppBar, Toolbar,
    Snackbar, Alert, TextField, MenuItem
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const categories = ['ALL', 'FOOD', 'TRAVEL', 'OFFICE', 'OTHER'];

const DashboardPage = () => {
    const navigate = useNavigate();
    const [logoutSuccess, setLogoutSuccess] = useState(false);
    const [filterSuccess, setFilterSuccess] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('ALL');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('googleLogin');
        setLogoutSuccess(true);
        setTimeout(() => navigate('/'), 1500);
    };

    const handleFilter = async () => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        try {
            let url = `http://localhost:8080/api/expenses/user/${userId}`;
            if (selectedDate) {
                url = `http://localhost:8080/api/expenses/date/${selectedDate}`;
            } else if (selectedCategory !== 'ALL') {
                url = `http://localhost:8080/api/expenses/category/${selectedCategory}`;
            }

            await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setFilterSuccess(true);
            setTimeout(() => navigate('/view-expenses'), 500);
        } catch (err) {
            alert('Filter failed');
            console.error(err);
        }
    };

    return (
        <>
            {/* Top AppBar */}
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">Dashboard</Typography>
                    <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>

            <Box sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Welcome to the Dashboard
                </Typography>

                {/* Create + View Buttons */}
                <Button
                    variant="contained"
                    sx={{ mt: 2, mr: 2 }}
                    color="primary"
                    onClick={() => navigate('/create-expense')}
                >
                    Create New Expense
                </Button>
                <Button
                    variant="outlined"
                    sx={{ mt: 2 }}
                    color="secondary"
                    onClick={() => navigate('/view-expenses')}
                >
                    View My Expenses
                </Button>

                {/* Filter Controls */}
                <Box sx={{ mt: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
                    <TextField
                        label="Filter by Date"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={selectedDate}
                        onChange={(e) => {
                            setSelectedDate(e.target.value);
                            setSelectedCategory('ALL');
                        }}
                    />
                    <TextField
                        select
                        label="Filter by Category"
                        value={selectedCategory}
                        onChange={(e) => {
                            setSelectedCategory(e.target.value);
                            setSelectedDate('');
                        }}
                        sx={{ minWidth: 180 }}
                    >
                        {categories.map((cat) => (
                            <MenuItem key={cat} value={cat}>
                                {cat}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Button
                        variant="contained"
                        onClick={handleFilter}
                        disabled={!selectedDate && selectedCategory === 'ALL'}
                    >
                        Apply Filter
                    </Button>
                </Box>
            </Box>

            {/* Snackbars */}
            <Snackbar
                open={logoutSuccess}
                autoHideDuration={1500}
                onClose={() => setLogoutSuccess(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="success" variant="filled">
                    Logged out successfully!
                </Alert>
            </Snackbar>

            <Snackbar
                open={filterSuccess}
                autoHideDuration={1000}
                onClose={() => setFilterSuccess(false)}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert severity="info" variant="filled">
                    Filter applied!
                </Alert>
            </Snackbar>
        </>
    );
};

export default DashboardPage;
