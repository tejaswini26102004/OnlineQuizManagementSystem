import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import Quizzes from './pages/Quizzes';
import Navbar from './components/Navbar';
import { isLoggedIn } from './services/authService';

// This protects pages that require login
function PrivateRoute({ children }) {
    return isLoggedIn() ? children : <Navigate to="/login" />;
}

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/welcome" element={
                    <PrivateRoute><Welcome /></PrivateRoute>
                } />
                <Route path="/quizzes" element={
                    <PrivateRoute><Quizzes /></PrivateRoute>
                } />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;