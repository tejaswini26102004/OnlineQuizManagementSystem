import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, saveUser } from '../services/authService';

const styles = {
    container: {
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        background: 'white',
        borderRadius: '16px',
        padding: '40px',
        width: '400px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
    },
    title: { color: '#5a3d8a', marginBottom: '25px', fontSize: '24px' },
    formGroup: { marginBottom: '18px' },
    label: { display: 'block', marginBottom: '6px', color: '#555', fontWeight: '600', fontSize: '14px' },
    input: { width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '10px', fontSize: '14px', boxSizing: 'border-box' },
    btn: { width: '100%', padding: '12px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '25px', fontSize: '15px', cursor: 'pointer', marginTop: '10px' },
    error: { background: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '8px', marginBottom: '15px', fontSize: '14px' },
    success: { background: '#d4edda', color: '#155724', padding: '10px', borderRadius: '8px', marginBottom: '15px', fontSize: '14px' },
    link: { color: '#667eea', cursor: 'pointer', textDecoration: 'underline' }
};

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            const response = await login(formData);
            saveUser(response.data);
            navigate('/welcome');
        } catch (error) {
            setMessage('Invalid email or password. Please try again.');
            setIsError(true);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>🔐 Login</h2>
                {message && <div style={isError ? styles.error : styles.success}>{message}</div>}
                <div style={styles.formGroup}>
                    <label style={styles.label}>Email</label>
                    <input style={styles.input} type="email" name="email" placeholder="Enter your email" onChange={handleChange} />
                </div>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Password</label>
                    <input style={styles.input} type="password" name="password" placeholder="Enter your password" onChange={handleChange} />
                </div>
                <button style={styles.btn} onClick={handleLogin}>Login</button>
                <p style={{ textAlign: 'center', marginTop: '15px', color: '#888', fontSize: '14px' }}>
                    Don't have an account?{' '}
                    <span style={styles.link} onClick={() => navigate('/register')}>Register here</span>
                </p>
            </div>
        </div>
    );
}

export default Login;