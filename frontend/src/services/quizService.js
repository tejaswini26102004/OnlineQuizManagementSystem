import axios from 'axios';
import { API_URL, getHeaders } from './authService';

// GET all quizzes
export const getAllQuizzes = () => axios.get(`${API_URL}/quiz`, getHeaders());

// GET single quiz by id
export const getQuizById = (id) => axios.get(`${API_URL}/quiz/${id}`, getHeaders());

// CREATE quiz (Teacher)
export const createQuiz = (data) => axios.post(`${API_URL}/quiz`, data, getHeaders());

// UPDATE quiz (Teacher)
export const updateQuiz = (id, data) => axios.put(`${API_URL}/quiz/${id}`, data, getHeaders());

// DELETE quiz (Teacher)
export const deleteQuiz = (id) => axios.delete(`${API_URL}/quiz/${id}`, getHeaders());

// ADD question to quiz (Teacher)
export const addQuestion = (quizId, data) => axios.post(`${API_URL}/quiz/${quizId}/questions`, data, getHeaders());

// DELETE question (Teacher)
export const deleteQuestion = (questionId) => axios.delete(`${API_URL}/quiz/questions/${questionId}`, getHeaders());

// ATTEMPT quiz (Student)
export const attemptQuiz = (data) => axios.post(`${API_URL}/quiz/attempt`, data, getHeaders());

// GET my results (Student)
export const getMyResults = () => axios.get(`${API_URL}/quiz/results/my`, getHeaders());

// GET quiz results (Teacher)
export const getQuizResults = (quizId) => axios.get(`${API_URL}/quiz/${quizId}/results`, getHeaders());