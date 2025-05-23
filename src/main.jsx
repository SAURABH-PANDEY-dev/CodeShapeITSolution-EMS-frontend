// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
//
// import { BrowserRouter } from 'react-router-dom';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
//
// const darkTheme = createTheme({
//     palette: { mode: 'dark' },
// });
//
// ReactDOM.createRoot(document.getElementById('root')).render(
//     <React.StrictMode>
//         <BrowserRouter>
//             <ThemeProvider theme={darkTheme}>
//                 <CssBaseline />
//                 <App />
//             </ThemeProvider>
//         </BrowserRouter>
//     </React.StrictMode>
// );
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // We'll create this for basic global styles
import { AuthProvider } from './context/AuthContext.jsx'; // We'll create this context for authentication

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>,
);