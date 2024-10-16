import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {BrowserRouter as Router} from 'react-router-dom';
import AuthContextProvider from "./context/AuthContextProvider.jsx";
import {UserProvider} from "./context/UserProvider.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Router>
            <AuthContextProvider>
                <UserProvider>
                <App/>
                </UserProvider>
            </AuthContextProvider>
        </Router>
    </React.StrictMode>,
)
