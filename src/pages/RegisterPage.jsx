import React, { useState } from 'react';
import { Paper, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MenuItem } from '@mui/material';

const RegisterPage = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [role, setRole] = useState('EMPLOYEE');

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/users', {
                fullName,
                email,
                password,
                role
            });
            alert('Registration successful. Please login.');
            navigate('/');
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message); // Show backend's message
            } else {
                alert('Registration failed');
            }
            console.error(err);
        }
    };

    return (
        <Box
            sx={{
                height: '70vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Paper sx={{ p: 4, width: 350 }}>
                <Typography variant="h6" align="center" gutterBottom>
                    Register
                </Typography>

                <form onSubmit={handleRegister}>
                    <TextField
                        label="Full Name"
                        fullWidth
                        margin="normal"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <TextField
                        label="Password"
                        type="password"
                        fullWidth
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <TextField
                        select
                        label="Role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    >
                        <MenuItem value="EMPLOYEE">Employee</MenuItem>
                        <MenuItem value="MANAGER">Manager</MenuItem>
                        <MenuItem value="ADMIN">Admin</MenuItem>
                    </TextField>

                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                        Register
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};
export default RegisterPage;