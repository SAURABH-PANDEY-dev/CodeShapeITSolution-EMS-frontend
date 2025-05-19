import React, { useState } from 'react';
import { Paper, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8080/api/users/login', {
                email,
                password,
            });
            localStorage.setItem('token', res.data.accessToken);
            localStorage.setItem('userId', res.data.userId);
            alert('Login Successful.');
            navigate('/dashboard');
        } catch (err) {
            alert('Login failed');
            console.error(err);
        }
        // console.log('Submitting login form with',email,password);
    };

    return (
        <Box
            sx={{
                height: '60vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Paper sx={{ p: 4, width: 350 }}>
                <Typography variant="h6" align="center" gutterBottom>
                    Login
                </Typography>

                <form onSubmit={handleSubmit}>
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
                    <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                        Login
                    </Button>
                    <Button
                        variant="outlined"
                        fullWidth
                        sx={{ mt: 2 }}
                        onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/google'}
                    >
                        Sign in with Google
                    </Button>

                    <Typography
                        variant="body2"
                        align="center"
                        sx={{ mt: 2, cursor: 'pointer', textDecoration: 'underline' }}
                        onClick={() => navigate('/register')}
                    >
                        Don't have an account? Register
                    </Typography>
                </form>
            </Paper>
        </Box>
    );
};

export default LoginPage;