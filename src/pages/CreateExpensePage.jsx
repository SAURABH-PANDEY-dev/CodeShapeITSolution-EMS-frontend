// // src/pages/CreateExpensePage.jsx
// import React, { useState, useEffect } from 'react';
// import {
//     Box, Typography, TextField, MenuItem, Button,
//     Snackbar, Alert
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import ExpensesService from '../services/ExpensesService'; // Correct path to service
// import { useAuth } from '../context/AuthContext'; // Import useAuth hook
//
// const CreateExpensePage = () => {
//     const navigate = useNavigate();
//     const { user } = useAuth(); // Get authenticated user details
//
//     const [expense, setExpense] = useState({
//         description: '',
//         amount: '',
//         date: new Date().toISOString().slice(0, 10), // Default to today's date
//         categoryId: '', // Use categoryId for backend
//     });
//     const [file, setFile] = useState(null);
//     const [categories, setCategories] = useState([]); // State to store fetched categories
//     const [loadingCategories, setLoadingCategories] = useState(true);
//     const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
//
//     // Fetch categories on component mount
//     useEffect(() => {
//         const fetchCategories = async () => {
//             try {
//                 setLoadingCategories(true);
//                 const response = await ExpensesService.fetchExpenseCategories();
//                 console.log('Fetched categories:', response); // Debug log
//                 setCategories(response); // Updated to use raw response (array)
//             } catch (error) {
//                 console.error('Failed to fetch categories:', error.response?.data || error.message);
//                 setSnackbar({ open: true, message: 'Failed to load categories.', severity: 'error' });
//             } finally {
//                 setLoadingCategories(false);
//             }
//         };
//         fetchCategories();
//     }, []);
//
//     const handleChange = (e) => {
//         setExpense({ ...expense, [e.target.name]: e.target.value });
//     };
//
//     const handleFileChange = (e) => {
//         setFile(e.target.files[0]);
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault(); // Prevent default form submission
//         setSnackbar({ open: false, message: '', severity: 'success' }); // Clear previous snackbar
//
//         if (!user || !user.id) {
//             setSnackbar({ open: true, message: 'User not authenticated. Please log in.', severity: 'error' });
//             return;
//         }
//
//         if (!expense.description || !expense.amount || !expense.date || !expense.categoryId) {
//             setSnackbar({ open: true, message: 'Please fill in all required fields.', severity: 'warning' });
//             return;
//         }
//
//         try {
//             const formData = new FormData();
//
//             const expenseJson = {
//                 description: expense.description,
//                 amount: parseFloat(expense.amount),
//                 date: expense.date,
//                 category: { id: parseInt(expense.categoryId, 10) },
//             };
//
//             formData.append('expense', new Blob([JSON.stringify(expenseJson)], {
//                 type: 'application/json'
//             }));
//
//             if (file) {
//                 formData.append('file', file);
//             }
//
//             await ExpensesService.addExpenseMultipart(user.id, formData);
//
//             setSnackbar({ open: true, message: 'Expense created successfully!', severity: 'success' });
//             setExpense({
//                 description: '',
//                 amount: '',
//                 date: new Date().toISOString().slice(0, 10),
//                 categoryId: '',
//             });
//             setFile(null);
//             setTimeout(() => navigate('/expenses'), 1500);
//         } catch (error) {
//             console.error('Failed to create expense:', error.response?.data || error.message);
//             setSnackbar({ open: true, message: error.response?.data?.message || 'Failed to create expense. Check console for details.', severity: 'error' });
//         }
//     };
//
//     return (
//         <Box sx={{ p: 4, maxWidth: 500, margin: 'auto', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
//             <Typography variant="h5" gutterBottom sx={{ mb: 3, textAlign: 'center', color: 'primary.main' }}>
//                 Create New Expense
//             </Typography>
//
//             <form onSubmit={handleSubmit}>
//                 <TextField
//                     label="Description"
//                     name="description"
//                     value={expense.description}
//                     onChange={handleChange}
//                     fullWidth
//                     required
//                     sx={{ mb: 2 }}
//                 />
//                 <TextField
//                     label="Amount"
//                     name="amount"
//                     type="number"
//                     value={expense.amount}
//                     onChange={handleChange}
//                     fullWidth
//                     required
//                     inputProps={{ step: "0.01", min: "0" }}
//                     sx={{ mb: 2 }}
//                 />
//                 <TextField
//                     label="Date"
//                     name="date"
//                     type="date"
//                     InputLabelProps={{ shrink: true }}
//                     value={expense.date}
//                     onChange={handleChange}
//                     fullWidth
//                     required
//                     sx={{ mb: 2 }}
//                 />
//                 <TextField
//                     select
//                     label="Category"
//                     name="categoryId"
//                     value={expense.categoryId}
//                     onChange={handleChange}
//                     fullWidth
//                     required
//                     disabled={loadingCategories}
//                     sx={{ mb: 2 }}
//                 >
//                     {loadingCategories ? (
//                         <MenuItem value="">Loading Categories...</MenuItem>
//                     ) : [
//                         <MenuItem key="default" value="">Select a Category</MenuItem>,
//                         ...categories.map((cat) => (
//                             <MenuItem key={cat.id} value={cat.id}>
//                                 {cat.name}
//                             </MenuItem>
//                         ))
//                     ]}
//
//                 </TextField>
//
//                 <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>Attach Invoice (Optional):</Typography>
//                 <input
//                     type="file"
//                     accept=".pdf,.png,.jpg,.jpeg"
//                     onChange={handleFileChange}
//                     style={{ marginTop: '8px', marginBottom: '16px', display: 'block' }}
//                 />
//
//                 <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 3 }}>
//                     Create Expense
//                 </Button>
//             </form>
//
//             <Snackbar
//                 open={snackbar.open}
//                 autoHideDuration={4000}
//                 onClose={() => setSnackbar({ ...snackbar, open: false })}
//                 anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//             >
//                 <Alert
//                     onClose={() => setSnackbar({ ...snackbar, open: false })}
//                     severity={snackbar.severity}
//                     sx={{ width: '100%' }}
//                 >
//                     {snackbar.message}
//                 </Alert>
//             </Snackbar>
//         </Box>
//     );
// };
// export default CreateExpensePage;

// src/pages/CreateExpensePage.jsx
import React, { useState } from 'react';
import {
    Box, Typography, TextField, MenuItem, Button,
    Snackbar, Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ExpensesService from '../services/ExpensesService'; // Correct path to service
import { useAuth } from '../context/AuthContext'; // Import useAuth hook

const CreateExpensePage = () => {
    const navigate = useNavigate();
    const { user } = useAuth(); // Get authenticated user details

    const [expense, setExpense] = useState({
        description: '',
        amount: '',
        date: new Date().toISOString().slice(0, 10), // Default to today's date
        categoryId: '', // Use categoryId for backend
    });
    const [file, setFile] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleChange = (e) => {
        setExpense({ ...expense, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setSnackbar({ open: false, message: '', severity: 'success' }); // Clear previous snackbar

        if (!user || !user.id) {
            setSnackbar({ open: true, message: 'User not authenticated. Please log in.', severity: 'error' });
            return;
        }

        if (!expense.description || !expense.amount || !expense.date || !expense.categoryId) {
            setSnackbar({ open: true, message: 'Please fill in all required fields.', severity: 'warning' });
            return;
        }

        try {
            const formData = new FormData();

            const expenseJson = {
                description: expense.description,
                amount: parseFloat(expense.amount),
                date: expense.date,
                category: expense.categoryId,  // Adjusted for string enum
            };

            formData.append('expense', new Blob([JSON.stringify(expenseJson)], {
                type: 'application/json'
            }));

            if (file) {
                formData.append('file', file);
            }

            await ExpensesService.addExpenseMultipart(user.id, formData);

            setSnackbar({ open: true, message: 'Expense created successfully!', severity: 'success' });
            setExpense({
                description: '',
                amount: '',
                date: new Date().toISOString().slice(0, 10),
                categoryId: '',
            });
            setFile(null);
            setTimeout(() => navigate('/expenses'), 1500);
        } catch (error) {
            console.error('Failed to create expense:', error.response?.data || error.message);
            setSnackbar({ open: true, message: error.response?.data?.message || 'Failed to create expense. Check console for details.', severity: 'error' });
        }
    };

    return (
        <Box sx={{ p: 4, maxWidth: 500, margin: 'auto', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h5" gutterBottom sx={{ mb: 3, textAlign: 'center', color: 'primary.main' }}>
                Create New Expense
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    label="Description"
                    name="description"
                    value={expense.description}
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Amount"
                    name="amount"
                    type="number"
                    value={expense.amount}
                    onChange={handleChange}
                    fullWidth
                    required
                    inputProps={{ step: "0.01", min: "0" }}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Date"
                    name="date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={expense.date}
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                />
                <TextField
                    select
                    label="Category"
                    name="categoryId"
                    value={expense.categoryId}
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                >
                    <MenuItem value="">Select a Category</MenuItem>
                    <MenuItem value="TRAVEL">TRAVEL</MenuItem>
                    <MenuItem value="FOOD">FOOD</MenuItem>
                    <MenuItem value="OFFICE">OFFICE</MenuItem>
                    <MenuItem value="OTHER">OTHER</MenuItem>
                </TextField>

                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>Attach Invoice (Optional):</Typography>
                <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={handleFileChange}
                    style={{ marginTop: '8px', marginBottom: '16px', display: 'block' }}
                />

                <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 3 }}>
                    Create Expense
                </Button>
            </form>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={4000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default CreateExpensePage;
