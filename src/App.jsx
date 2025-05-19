import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

import LoginPage from './pages/LoginPage';
import RegisterPage from "./pages/RegisterPage.jsx";
import CreateExpensePage from "./pages/CreateExpensePage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ViewExpensesPage from "./pages/ViewExpensesPage.jsx";
import UpdateExpensePage from "./pages/UpdateExpensePage.jsx";
function App() {
    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Expense Management System
            </Typography>

            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/create-expense" element={<CreateExpensePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/view-expenses" element={<ViewExpensesPage />} />
                <Route path="/update-expense/:expenseId" element={<UpdateExpensePage />} />



            </Routes>
        </Container>
    );
}
export default App;