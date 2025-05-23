// import React, { useState } from 'react';
// import { Paper, TextField, Button, Typography, Box } from '@mui/material';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
//
// const LoginPage = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const res = await axios.post('http://localhost:8080/api/users/login', {
//                 email,
//                 password,
//             });
//             localStorage.setItem('token', res.data.accessToken);
//             localStorage.setItem('userId', res.data.userId);
//             alert('Login Successful.');
//             navigate('/dashboard');
//         } catch (err) {
//             alert('Login failed');
//             console.error(err);
//         }
//         // console.log('Submitting login form with',email,password);
//     };
//
//     return (
//         <Box
//             sx={{
//                 height: '60vh',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//             }}
//         >
//             <Paper sx={{ p: 4, width: 350 }}>
//                 <Typography variant="h6" align="center" gutterBottom>
//                     Login
//                 </Typography>
//
//                 <form onSubmit={handleSubmit}>
//                     <TextField
//                         label="Email"
//                         fullWidth
//                         margin="normal"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         required
//                     />
//                     <TextField
//                         label="Password"
//                         type="password"
//                         fullWidth
//                         margin="normal"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                     <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
//                         Login
//                     </Button>
//                     <Button
//                         variant="outlined"
//                         fullWidth
//                         sx={{ mt: 2 }}
//                         onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/google'}
//                     >
//                         Sign in with Google
//                     </Button>
//
//                     <Typography
//                         variant="body2"
//                         align="center"
//                         sx={{ mt: 2, cursor: 'pointer', textDecoration: 'underline' }}
//                         onClick={() => navigate('/register')}
//                     >
//                         Don't have an account? Register
//                     </Typography>
//                 </form>
//             </Paper>
//         </Box>
//     );
// };
// export default LoginPage;

// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Get the login function from AuthContext

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        try {
            await login({ email, password }); // Call the login function
            navigate('/'); // Redirect to dashboard on successful login
        } catch (err) {
            // Handle login error (e.g., invalid credentials)
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
            console.error('Login error:', err);
        }
    };

    return (
        <div className="auth-form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Login</button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '20px' }}>
                Don't have an account? <Link to="/register">Register here</Link>
            </p>
        </div>
    );
}

export default LoginPage;