import React, { useState, useEffect } from 'react';
import { getRole, getUserId } from '../services/authService';
import { getAllQuizzes, createQuiz, updateQuiz, deleteQuiz, addQuestion, attemptQuiz, getMyResults, getQuizResults } from '../services/quizService';

const styles = {
    container: { minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '30px 20px' },
    card: { background: 'white', borderRadius: '16px', padding: '30px', maxWidth: '900px', margin: '0 auto', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' },
    title: { color: '#5a3d8a', marginBottom: '20px', fontSize: '24px' },
    quizCard: { background: '#f8f7ff', borderLeft: '5px solid #667eea', borderRadius: '10px', padding: '20px', marginBottom: '15px' },
    quizTitle: { color: '#5a3d8a', marginBottom: '8px' },
    quizDesc: { color: '#666', fontSize: '14px', marginBottom: '10px' },
    btnGroup: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
    btn: { padding: '8px 16px', border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' },
    btnGreen: { background: 'linear-gradient(135deg, #11998e, #38ef7d)', color: 'white' },
    btnBlue: { background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white' },
    btnRed: { background: 'linear-gradient(135deg, #ff416c, #ff4b2b)', color: 'white' },
    btnYellow: { background: 'linear-gradient(135deg, #f7971e, #ffd200)', color: 'white' },
    formGroup: { marginBottom: '15px' },
    label: { display: 'block', marginBottom: '5px', color: '#555', fontWeight: '600', fontSize: '14px' },
    input: { width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' },
    textarea: { width: '100%', padding: '10px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box', height: '80px' },
    alert: { padding: '10px', borderRadius: '8px', marginBottom: '15px', fontSize: '14px' },
    alertSuccess: { background: '#d4edda', color: '#155724' },
    alertError: { background: '#f8d7da', color: '#721c24' },
    sectionCard: { background: '#f0f0ff', borderRadius: '10px', padding: '20px', marginTop: '15px' }
};

function Quizzes() {
    const role = getRole();
    const studentId = getUserId();

    const [quizzes, setQuizzes] = useState([]);
    const [message, setMessage] = useState('');
    const [isError, setIsError] = useState(false);

    // Form states
    const [showQuizForm, setShowQuizForm] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [quizForm, setQuizForm] = useState({ title: '', description: '' });
    const [selectedQuizId, setSelectedQuizId] = useState(null);

    // Question form
    const [showQuestionForm, setShowQuestionForm] = useState(false);
    const [questionForm, setQuestionForm] = useState({ questionText: '', optionA: '', optionB: '', optionC: '', optionD: '', correctAnswer: '' });
    const [questionQuizId, setQuestionQuizId] = useState(null);

    // Attempt quiz
    const [showAttempt, setShowAttempt] = useState(false);
    const [attemptQuizData, setAttemptQuizData] = useState(null);
    const [answers, setAnswers] = useState({});
    const [attemptResult, setAttemptResult] = useState(null);

    // Results
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState([]);
    const [myResults, setMyResults] = useState([]);
    const [showMyResults, setShowMyResults] = useState(false);

    // Load quizzes on page load
    useEffect(() => {
        loadQuizzes();
    }, []);

    const loadQuizzes = async () => {
        try {
            const response = await getAllQuizzes();
            setQuizzes(response.data);
        } catch {
            setMessage('Failed to load quizzes.');
            setIsError(true);
        }
    };

    // TEACHER — show create form
    const handleShowCreate = () => {
        setShowQuizForm(true);
        setEditMode(false);
        setQuizForm({ title: '', description: '' });
    };

    // TEACHER — show edit form
    const handleShowEdit = (quiz) => {
        setShowQuizForm(true);
        setEditMode(true);
        setSelectedQuizId(quiz.quizId);
        setQuizForm({ title: quiz.title, description: quiz.description });
    };

    // TEACHER — save quiz (create or update)
    const handleSaveQuiz = async () => {
        try {
            if (editMode) {
                await updateQuiz(selectedQuizId, quizForm);
                setMessage('Quiz updated successfully!');
            } else {
                await createQuiz(quizForm);
                setMessage('Quiz created successfully!');
            }
            setIsError(false);
            setShowQuizForm(false);
            loadQuizzes();
        } catch {
            setMessage('Failed to save quiz.');
            setIsError(true);
        }
    };

    // TEACHER — delete quiz
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this quiz?')) {
            try {
                await deleteQuiz(id);
                setMessage('Quiz deleted successfully!');
                setIsError(false);
                loadQuizzes();
            } catch {
                setMessage('Failed to delete quiz.');
                setIsError(true);
            }
        }
    };

    // TEACHER — show add question form
    const handleShowAddQuestion = (quizId) => {
        setQuestionQuizId(quizId);
        setShowQuestionForm(true);
        setQuestionForm({ questionText: '', optionA: '', optionB: '', optionC: '', optionD: '', correctAnswer: '' });
    };

    // TEACHER — save question
    const handleSaveQuestion = async () => {
        try {
            await addQuestion(questionQuizId, questionForm);
            setMessage('Question added successfully!');
            setIsError(false);
            setShowQuestionForm(false);
            loadQuizzes();
        } catch {
            setMessage('Failed to add question.');
            setIsError(true);
        }
    };

    // TEACHER — view results
    const handleViewResults = async (quizId) => {
        try {
            const response = await getQuizResults(quizId);
            setResults(response.data);
            setShowResults(true);
        } catch {
            setMessage('Failed to load results.');
            setIsError(true);
        }
    };

    // STUDENT — start quiz attempt
    const handleAttempt = (quiz) => {
        setAttemptQuizData(quiz);
        setAnswers({});
        setAttemptResult(null);
        setShowAttempt(true);
    };

    // STUDENT — submit answers
    const handleSubmitAttempt = async () => {
        try {
            const response = await attemptQuiz({ quizId: attemptQuizData.quizId, answers });
            setAttemptResult(response.data);
        } catch {
            setMessage('Failed to submit quiz.');
            setIsError(true);
        }
    };

    // STUDENT — view my results
    const handleMyResults = async () => {
        try {
            const response = await getMyResults();
            setMyResults(response.data);
            setShowMyResults(true);
        } catch {
            setMessage('Failed to load results.');
            setIsError(true);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>🧠 Quizzes</h2>

                {message && (
                    <div style={{ ...styles.alert, ...(isError ? styles.alertError : styles.alertSuccess) }}>
                        {message}
                    </div>
                )}

                {/* Teacher buttons */}
                {role === 'Teacher' && (
                    <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                        <button style={{ ...styles.btn, ...styles.btnGreen }} onClick={handleShowCreate}>+ Create Quiz</button>
                    </div>
                )}

                {/* Student buttons */}
                {role === 'Student' && (
                    <div style={{ marginBottom: '20px' }}>
                        <button style={{ ...styles.btn, ...styles.btnBlue }} onClick={handleMyResults}>📊 My Results</button>
                    </div>
                )}

                {/* Create/Edit Quiz Form */}
                {showQuizForm && (
                    <div style={styles.sectionCard}>
                        <h3 style={{ color: '#5a3d8a', marginBottom: '15px' }}>{editMode ? 'Edit Quiz' : 'New Quiz'}</h3>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Title</label>
                            <input style={styles.input} value={quizForm.title} onChange={(e) => setQuizForm({ ...quizForm, title: e.target.value })} placeholder="Quiz title" />
                        </div>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Description</label>
                            <textarea style={styles.textarea} value={quizForm.description} onChange={(e) => setQuizForm({ ...quizForm, description: e.target.value })} placeholder="Quiz description" />
                        </div>
                        <div style={styles.btnGroup}>
                            <button style={{ ...styles.btn, ...styles.btnGreen }} onClick={handleSaveQuiz}>{editMode ? 'Update' : 'Create'}</button>
                            <button style={{ ...styles.btn, ...styles.btnRed }} onClick={() => setShowQuizForm(false)}>Cancel</button>
                        </div>
                    </div>
                )}

                {/* Add Question Form */}
                {showQuestionForm && (
                    <div style={styles.sectionCard}>
                        <h3 style={{ color: '#5a3d8a', marginBottom: '15px' }}>Add Question</h3>
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Question</label>
                            <input style={styles.input} value={questionForm.questionText} onChange={(e) => setQuestionForm({ ...questionForm, questionText: e.target.value })} placeholder="Enter question" />
                        </div>
                        {['A', 'B', 'C', 'D'].map(opt => (
                            <div style={styles.formGroup} key={opt}>
                                <label style={styles.label}>Option {opt}</label>
                                <input style={styles.input} value={questionForm[`option${opt}`]} onChange={(e) => setQuestionForm({ ...questionForm, [`option${opt}`]: e.target.value })} placeholder={`Option ${opt}`} />
                            </div>
                        ))}
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Correct Answer</label>
                            <select style={styles.input} value={questionForm.correctAnswer} onChange={(e) => setQuestionForm({ ...questionForm, correctAnswer: e.target.value })}>
                                <option value="">-- Select --</option>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                            </select>
                        </div>
                        <div style={styles.btnGroup}>
                            <button style={{ ...styles.btn, ...styles.btnGreen }} onClick={handleSaveQuestion}>Add Question</button>
                            <button style={{ ...styles.btn, ...styles.btnRed }} onClick={() => setShowQuestionForm(false)}>Cancel</button>
                        </div>
                    </div>
                )}

                {/* Quiz List */}
                {quizzes.length === 0 && <p style={{ color: '#888', textAlign: 'center' }}>No quizzes found.</p>}

                {quizzes.map(quiz => (
                    <div style={styles.quizCard} key={quiz.quizId}>
                        <h3 style={styles.quizTitle}>{quiz.title}</h3>
                        <p style={styles.quizDesc}>{quiz.description}</p>
                        <p style={{ fontSize: '13px', color: '#888' }}>Questions: {quiz.questions ? quiz.questions.length : 0}</p>

                        {/* Teacher actions */}
                        {role === 'Teacher' && (
                            <div style={styles.btnGroup}>
                                <button style={{ ...styles.btn, ...styles.btnYellow }} onClick={() => handleShowEdit(quiz)}>✏️ Edit</button>
                                <button style={{ ...styles.btn, ...styles.btnRed }} onClick={() => handleDelete(quiz.quizId)}>🗑️ Delete</button>
                                <button style={{ ...styles.btn, ...styles.btnBlue }} onClick={() => handleShowAddQuestion(quiz.quizId)}>➕ Add Question</button>
                                <button style={{ ...styles.btn, ...styles.btnGreen }} onClick={() => handleViewResults(quiz.quizId)}>📊 Results</button>
                            </div>
                        )}

                        {/* Student actions */}
                        {role === 'Student' && (
                            <div style={styles.btnGroup}>
                                <button style={{ ...styles.btn, ...styles.btnGreen }} onClick={() => handleAttempt(quiz)}>Attempt Quiz</button>
                            </div>
                        )}
                    </div>
                ))}

                {/* Attempt Quiz Modal */}
                {showAttempt && attemptQuizData && (
                    <div style={styles.sectionCard}>
                        <h3 style={{ color: '#5a3d8a', marginBottom: '15px' }}>📝 {attemptQuizData.title}</h3>

                        {attemptResult ? (
                            <div>
                                <div style={{ ...styles.alert, ...styles.alertSuccess, fontSize: '18px', textAlign: 'center' }}>
                                    🎉 Your Score: {attemptResult.score} / {attemptResult.totalQuestions}
                                </div>
                                <button style={{ ...styles.btn, ...styles.btnBlue }} onClick={() => setShowAttempt(false)}>Close</button>
                            </div>
                        ) : (
                            <div>
                                {attemptQuizData.questions && attemptQuizData.questions.map((q, index) => (
                                    <div key={q.questionId} style={{ marginBottom: '20px' }}>
                                        <p style={{ fontWeight: '600', marginBottom: '10px' }}>{index + 1}. {q.questionText}</p>
                                        {['A', 'B', 'C', 'D'].map(opt => (
                                            <label key={opt} style={{ display: 'block', marginBottom: '5px', cursor: 'pointer' }}>
                                                <input
                                                    type="radio"
                                                    name={`q_${q.questionId}`}
                                                    value={opt}
                                                    onChange={() => setAnswers({ ...answers, [q.questionId]: opt })}
                                                />{' '}
                                                {opt}. {q[`option${opt}`]}
                                            </label>
                                        ))}
                                    </div>
                                ))}
                                <div style={styles.btnGroup}>
                                    <button style={{ ...styles.btn, ...styles.btnGreen }} onClick={handleSubmitAttempt}>Submit Answers</button>
                                    <button style={{ ...styles.btn, ...styles.btnRed }} onClick={() => setShowAttempt(false)}>Cancel</button>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Teacher — Quiz Results */}
                {showResults && (
                    <div style={styles.sectionCard}>
                        <h3 style={{ color: '#5a3d8a', marginBottom: '15px' }}>📊 Student Results</h3>
                        {results.length === 0 && <p style={{ color: '#888' }}>No results yet.</p>}
                        {results.map(r => (
    <div key={r.resultId} style={{ ...styles.quizCard, marginBottom: '10px' }}>
        <p><strong>Student ID:</strong> {r.studentId}</p>
        <p><strong>Student Name:</strong> {r.student ? r.student.name : 'Unknown'}</p>
        <p><strong>Score:</strong> {r.score} / {r.totalQuestions}</p>
        <p><strong>Attempted:</strong> {new Date(r.attemptedAt).toLocaleString()}</p>
    </div>
))}
                        <button style={{ ...styles.btn, ...styles.btnRed }} onClick={() => setShowResults(false)}>Close</button>
                    </div>
                )}

                {/* Student — My Results */}
                {showMyResults && (
                    <div style={styles.sectionCard}>
                        <h3 style={{ color: '#5a3d8a', marginBottom: '15px' }}>📊 My Results</h3>
                        {myResults.length === 0 && <p style={{ color: '#888' }}>No results yet.</p>}
                        {myResults.map(r => (
    <div key={r.resultId} style={{ ...styles.quizCard, marginBottom: '10px' }}>
        <p><strong>Your Student ID:</strong> {r.studentId}</p>
        <p><strong>Quiz:</strong> {r.quiz ? r.quiz.title : r.quizId}</p>
        <p><strong>Score:</strong> {r.score} / {r.totalQuestions}</p>
        <p><strong>Attempted:</strong> {new Date(r.attemptedAt).toLocaleString()}</p>
    </div>
))}
                        <button style={{ ...styles.btn, ...styles.btnRed }} onClick={() => setShowMyResults(false)}>Close</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Quizzes;