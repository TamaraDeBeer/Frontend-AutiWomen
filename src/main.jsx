import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter as Router} from 'react-router-dom';
import AuthContextProvider from "./context/AuthContextProvider.jsx";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <AuthContextProvider>
                <App/>
            </AuthContextProvider>
        </Router>
    </React.StrictMode>,
)
