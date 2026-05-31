import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getName, getRole } from '../services/authService';

const styles = {
    container: { minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', justifyContent: 'center', alignItems: 'center' },
    card: { background: 'white', borderRadius: '16px', padding: '50px', width: '500px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)', textAlign: 'center' },
    title: { color: '#5a3d8a', fontSize: '32px', marginBottom: '10px' },
    subtitle: { color: '#888', fontSize: '16px', marginBottom: '20px' },
    badge: { display: 'inline-block', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', padding: '6px 18px', borderRadius: '20px', fontSize: '14px', marginBottom: '25px' },
    desc: { color: '#555', marginBottom: '25px' },
    btn: { padding: '12px 30px', background: 'linear-gradient(135deg, #11998e, #38ef7d)', color: 'white', border: 'none', borderRadius: '25px', fontSize: '15px', cursor: 'pointer' }
};

function Welcome() {
    const navigate = useNavigate();
    const role = getRole();
    const name = getName();

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>👋 Welcome, {name}!</h2>
                <p style={styles.subtitle}>You are logged in to the Quiz Portal</p>
                <div style={styles.badge}>{role}</div>
                {role === 'Teacher' ? (
                    <p style={styles.desc}>As a <strong>Teacher</strong>, you can create quizzes, add questions, and view student results.</p>
                ) : (
                    <p style={styles.desc}>As a <strong>Student</strong>, you can view and attempt quizzes and see your results.</p>
                )}
                <button style={styles.btn} onClick={() => navigate('/quizzes')}>
                    🧠 Go to Quizzes
                </button>
            </div>
        </div>
    );
}

export default Welcome;