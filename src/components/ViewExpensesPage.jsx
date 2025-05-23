import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const DeleteExpenseButton = ({ expenseId, onDeleteSuccess }) => {
    const [openConfirm, setOpenConfirm] = useState(false);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const token = localStorage.getItem('token');

    const handleDeleteClick = () => {
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    const handleConfirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/expenses/${expenseId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setSnackbar({ open: true, message: 'Expense deleted successfully.', severity: 'success' });
            setOpenConfirm(false);
            if (onDeleteSuccess) onDeleteSuccess();
        } catch (error) {
            setSnackbar({ open: true, message: 'Failed to delete expense.', severity: 'error' });
            console.error('Delete failed:', error.response?.data || error.message);
            setOpenConfirm(false);
        }
    };

    return (
        <>
            <Button variant="outlined" color="error" onClick={handleDeleteClick}>
                Delete
            </Button>

            <Dialog open={openConfirm} onClose={handleCloseConfirm}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>Are you sure you want to delete this expense? This action cannot be undone.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseConfirm}>Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="error" autoFocus>Delete</Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
            </Snackbar>
        </>
    );
};

export default DeleteExpenseButton;
