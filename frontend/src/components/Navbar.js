import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, logout, getName, getRole } from '../services/authService';

// Styles
const styles = {
    navbar: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '15px 30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white'
    },
    title: { fontSize: '22px', fontWeight: 'bold' },
    btnGroup: { display: 'flex', gap: '10px', alignItems: 'center' },
    btn: {
        background: 'rgba(255,255,255,0.2)',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '20px',
        cursor: 'pointer',
        fontSize: '14px'
    },
    greeting: { fontSize: '14px', color: 'white' }
};

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!isLoggedIn()) return null;

    return (
        <div style={styles.navbar}>
            <span style={styles.title}>🧠 Quiz Portal</span>
            <div style={styles.btnGroup}>
                <span style={styles.greeting}>Hello, {getName()} ({getRole()})</span>
                <button style={styles.btn} onClick={() => navigate('/welcome')}>Home</button>
                <button style={styles.btn} onClick={() => navigate('/quizzes')}>Quizzes</button>
                <button style={styles.btn} onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default Navbar;