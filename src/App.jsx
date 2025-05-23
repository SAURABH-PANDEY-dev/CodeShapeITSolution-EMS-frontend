// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { Container, Typography } from '@mui/material';
//
// import LoginPage from './pages/LoginPage';
// import RegisterPage from "./pages/RegisterPage.jsx";
// import CreateExpensePage from "./pages/CreateExpensePage.jsx";
// import DashboardPage from "./pages/DashboardPage.jsx";
// import ViewExpensesPage from "./pages/ViewExpensesPage.jsx";
// import UpdateExpensePage from "./pages/UpdateExpensePage.jsx";
// import ExpenseDetailsPage from './pages/ExpenseDetailsPage';
// import ViewExpenseDetailsPage from './pages/ViewExpenseDetailsPage';
//
// function App() {
//     return (
//         <Container maxWidth="sm" sx={{ mt: 4 }}>
//             <Typography variant="h4" align="center" gutterBottom>
//                 Expense Management System
//             </Typography>
//
//             <Routes>
//                 <Route path="/" element={<LoginPage />} />
//                 <Route path="/dashboard" element={<DashboardPage />} />
//                 <Route path="/create-expense" element={<CreateExpensePage />} />
//                 <Route path="/register" element={<RegisterPage />} />
//                 <Route path="/view-expenses" element={<ViewExpensesPage />} />
//                 <Route path="/update-expense/:expenseId" element={<UpdateExpensePage />} />
//                 <Route path="/dashboard/view-expense/:expenseId" element={<ViewExpenseDetailsPage />} />
//                 <Route path="/expenses/:id" element={<ExpenseDetailsPage />} />
//
//             </Routes>
//         </Container>
//     );
// }
// export default App;

// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ViewExpensesPage from './pages/ViewExpensesPage';
import CreateExpensePage from './pages/CreateExpensePage';
import UpdateExpensePage from './pages/UpdateExpensePage';
import ViewExpenseDetailsPage from './pages/ViewExpenseDetailsPage';
import { useAuth } from './context/AuthContext.jsx'; // Import useAuth hook
// import Dashboard from './pages/Dashboard.jsx';


// A simple PrivateRoute component to protect authenticated routes
const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) {
        // Optionally render a loading spinner or message while checking auth state
        return <div>Loading authentication...</div>;
    }

    // If user is authenticated, render children, otherwise redirect to login
    return user ? children : <Navigate to="/login" replace />;
};

function App() {
    const { user, logout } = useAuth();

    return (
        <Router>
            {/* Navigation Bar */}
            <nav>
                <div>
                    {user && ( // Show navigation links only if logged in
                        <>
                            <Link to="/">Dashboard</Link>
                            <Link to="/expenses">View Expenses</Link>
                            <Link to="/expenses/create">Create Expense</Link>
                        </>
                    )}
                </div>
                <div>
                    {user ? (
                        <>
                            <span style={{ marginRight: '15px' }}>Hello, {user.username || 'User'}!</span>
                            <button onClick={logout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </>
                    )}
                </div>
            </nav>

            {/* Main content area */}
            <div className="container">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* Protected Routes (require authentication) */}
                    <Route path="/" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
                    <Route path="/expenses" element={<PrivateRoute><ViewExpensesPage /></PrivateRoute>} />
                    <Route path="/expenses/create" element={<PrivateRoute><CreateExpensePage /></PrivateRoute>} />
                    <Route path="/expenses/:id" element={<PrivateRoute><ViewExpenseDetailsPage /></PrivateRoute>} />
                    <Route path="/expenses/update/:id" element={<PrivateRoute><UpdateExpensePage /></PrivateRoute>} />
                    {/* Fallback route for unmatched paths */}
                    {/* If logged in, redirect to dashboard; otherwise, to login */}
                    <Route path="*" element={user ? <Navigate to="/" replace /> : <Navigate to="/login" replace />} />
                    {/*<Route path="/dashboard" element={<Dashboard />} />*/}
                </Routes>
            </div>
        </Router>
    );
}
export default App;