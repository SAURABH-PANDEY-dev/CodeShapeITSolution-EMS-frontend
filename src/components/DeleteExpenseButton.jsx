// // src/pages/components/DeleteExpenseButton.jsx
// import React from 'react';
//
// const DeleteExpenseButton = ({ expenseId, onDeleteSuccess }) => {
//     return (
//         <button onClick={() => alert(`Stub: Delete expense ${expenseId}`)}>
//             Delete
//         </button>
//     );
// };
//
// export default DeleteExpenseButton;

// src/components/DeleteExpenseButton.jsx
import React, { useState } from 'react';
import DeleteButton from './DeleteButton'; // Import the generic button
import ExpensesService from '../services/ExpensesService';

function DeleteExpenseButton({ expenseId, onDeleteSuccess }) {
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState('');

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this expense? This action cannot be undone.')) {
            setDeleting(true);
            setError('');
            try {
                await ExpensesService.removeExpense(expenseId);
                // Call the success callback passed from the parent component
                if (onDeleteSuccess) {
                    onDeleteSuccess(expenseId);
                }
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to delete expense.');
                console.error('Error deleting expense:', err);
            } finally {
                setDeleting(false);
            }
        }
    };

    return (
        <div>
            <DeleteButton onClick={handleDelete} disabled={deleting}>
                {deleting ? 'Deleting...' : 'Delete'}
            </DeleteButton>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default DeleteExpenseButton;