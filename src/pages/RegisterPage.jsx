// import React, { useState } from 'react';
// import { Paper, TextField, Button, Typography, Box } from '@mui/material';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { MenuItem } from '@mui/material';
//
// const RegisterPage = () => {
//     const [fullName, setFullName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();
//     const [role, setRole] = useState('EMPLOYEE');
//
//     const handleRegister = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post('http://localhost:8080/api/users', {
//                 fullName,
//                 email,
//                 password,
//                 role
//             });
//             alert('Registration successful. Please login.');
//             navigate('/');
//         } catch (err) {
//             if (err.response && err.response.data && err.response.data.message) {
//                 alert(err.response.data.message); // Show backend's message
//             } else {
//                 alert('Registration failed');
//             }
//             console.error(err);
//         }
//     };
//
//     return (
//         <Box
//             sx={{
//                 height: '70vh',
//                 display: 'flex',
//                 justifyContent: 'center',
//                 alignItems: 'center',
//             }}
//         >
//             <Paper sx={{ p: 4, width: 350 }}>
//                 <Typography variant="h6" align="center" gutterBottom>
//                     Register
//                 </Typography>
//
//                 <form onSubmit={handleRegister}>
//                     <TextField
//                         label="Full Name"
//                         fullWidth
//                         margin="normal"
//                         value={fullName}
//                         onChange={(e) => setFullName(e.target.value)}
//                         required
//                     />
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
//                     <TextField
//                         select
//                         label="Role"
//                         value={role}
//                         onChange={(e) => setRole(e.target.value)}
//                         fullWidth
//                         margin="normal"
//                         required
//                     >
//                         <MenuItem value="EMPLOYEE">Employee</MenuItem>
//                         <MenuItem value="MANAGER">Manager</MenuItem>
//                         <MenuItem value="ADMIN">Admin</MenuItem>
//                     </TextField>
//
//                     <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
//                         Register
//                     </Button>
//                 </form>
//             </Paper>
//         </Box>
//     );
// };
// export default RegisterPage;

// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

function RegisterPage() {
    const [fullName, setFullName] = useState(''); // Changed from username
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await register({ fullName, email, password }); // Use fullName
            setSuccess('Registration successful! You can now log in.');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed. Please try again.');
            console.error('Registration error:', err);
        }
    };

    return (
        <div className="auth-form-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="fullName">Full Name:</label>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </div>
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
                {success && <p className="success-message">{success}</p>}
                <button type="submit">Register</button>
            </form>
            <p style={{ textAlign: 'center', marginTop: '20px' }}>
                Already have an account? <Link to="/login">Login here</Link>
            </p>
        </div>
    );
}

export default RegisterPage;