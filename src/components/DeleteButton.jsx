// import React, { useState } from 'react';
// import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
//
// const DeleteButton = ({ onDelete }) => {
//     const [open, setOpen] = useState(false);
//
//     const handleOpen = () => setOpen(true);
//     const handleClose = () => setOpen(false);
//
//     const handleConfirm = () => {
//         onDelete();
//         setOpen(false);
//     };
//
//     return (
//         <>
//             <Button variant="outlined" color="error" onClick={handleOpen}>
//                 Delete
//             </Button>
//             <Dialog open={open} onClose={handleClose}>
//                 <DialogTitle>Confirm Delete</DialogTitle>
//                 <DialogContent>
//                     <DialogContentText>
//                         Are you sure you want to delete this expense? This action cannot be undone.
//                     </DialogContentText>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={handleClose}>Cancel</Button>
//                     <Button color="error" onClick={handleConfirm}>Delete</Button>
//                 </DialogActions>
//             </Dialog>
//         </>
//     );
// };
//
// export default DeleteButton;

// src/components/DeleteButton.jsx
import React from 'react';

function DeleteButton({ onClick, children = 'Delete', disabled }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="btn-danger" // Using a class from index.css
        >
            {children}
        </button>
    );
}

export default DeleteButton;