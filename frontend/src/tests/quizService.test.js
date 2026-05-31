// Jest tests for quizService
// We mock axios so we don't make real API calls
import axios from 'axios';
import * as quizService from '../services/quizService';
import * as authService from '../services/authService';

// Tell Jest to mock axios automatically
jest.mock('axios');

// Before each test set a fake token
beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('token', 'fake-token-123');
});

// =============================================
// TEST 1 — getAllQuizzes returns quiz list on success
// =============================================
test('getAllQuizzes returns quiz data on success', async () => {
    // ARRANGE — fake successful response
    const fakeQuizzes = [
        { quizId: 1, title: 'Math Quiz', description: 'Basic math' },
        { quizId: 2, title: 'Science Quiz', description: 'Basic science' }
    ];

    axios.get.mockResolvedValue({ data: fakeQuizzes });

    // ACT
    const response = await quizService.getAllQuizzes();

    // ASSERT
    expect(response.data).toHaveLength(2);
    expect(response.data[0].title).toBe('Math Quiz');
});

// =============================================
// TEST 2 — getAllQuizzes throws error on failure
// =============================================
test('getAllQuizzes throws error when API fails', async () => {
    // ARRANGE — fake failed response
    axios.get.mockRejectedValue(new Error('Network Error'));

    // ACT + ASSERT
    await expect(quizService.getAllQuizzes()).rejects.toThrow('Network Error');
});

// =============================================
// TEST 3 — createQuiz sends correct data
// =============================================
test('createQuiz sends quiz data and returns success', async () => {
    // ARRANGE
    const newQuiz = { title: 'New Quiz', description: 'New description' };
    axios.post.mockResolvedValue({ data: 'Quiz created successfully.' });

    // ACT
    const response = await quizService.createQuiz(newQuiz);

    // ASSERT
    expect(response.data).toBe('Quiz created successfully.');
    expect(axios.post).toHaveBeenCalled();
});

// =============================================
// TEST 4 — deleteQuiz calls correct endpoint
// =============================================
test('deleteQuiz calls API with correct quiz id', async () => {
    // ARRANGE
    axios.delete.mockResolvedValue({ data: 'Quiz deleted successfully.' });

    // ACT
    const response = await quizService.deleteQuiz(1);

    // ASSERT
    expect(response.data).toBe('Quiz deleted successfully.');
    expect(axios.delete).toHaveBeenCalled();
});

// =============================================
// TEST 5 — updateQuiz sends updated data
// =============================================
test('updateQuiz sends updated quiz data', async () => {
    // ARRANGE
    const updatedQuiz = { title: 'Updated Title', description: 'Updated desc' };
    axios.put.mockResolvedValue({ data: 'Quiz updated successfully.' });

    // ACT
    const response = await quizService.updateQuiz(1, updatedQuiz);

    // ASSERT
    expect(response.data).toBe('Quiz updated successfully.');
    expect(axios.put).toHaveBeenCalled();
});

// =============================================
// TEST 6 — attemptQuiz sends answers and gets score
// =============================================
test('attemptQuiz sends answers and returns score', async () => {
    // ARRANGE
    const attemptData = {
        quizId: 1,
        answers: { 1: 'A', 2: 'B' }
    };

    axios.post.mockResolvedValue({
        data: { score: 2, totalQuestions: 2 }
    });

    // ACT
    const response = await quizService.attemptQuiz(attemptData);

    // ASSERT
    expect(response.data.score).toBe(2);
    expect(response.data.totalQuestions).toBe(2);
});

// =============================================
// TEST 7 — getMyResults returns student results
// =============================================
test('getMyResults returns list of results for student', async () => {
    // ARRANGE
    const fakeResults = [
        { resultId: 1, quizId: 1, score: 3, totalQuestions: 5 }
    ];

    axios.get.mockResolvedValue({ data: fakeResults });

    // ACT
    const response = await quizService.getMyResults();

    // ASSERT
    expect(response.data).toHaveLength(1);
    expect(response.data[0].score).toBe(3);
});

// =============================================
// TEST 8 — getQuizResults returns results for teacher
// =============================================
test('getQuizResults returns all student results for a quiz', async () => {
    // ARRANGE
    const fakeResults = [
        { resultId: 1, studentId: 2, score: 4, totalQuestions: 5 },
        { resultId: 2, studentId: 3, score: 3, totalQuestions: 5 }
    ];

    axios.get.mockResolvedValue({ data: fakeResults });

    // ACT
    const response = await quizService.getQuizResults(1);

    // ASSERT
    expect(response.data).toHaveLength(2);
    expect(response.data[0].studentId).toBe(2);
});

// =============================================
// TEST 9 — createQuiz fails on network error
// =============================================
test('createQuiz throws error when API fails', async () => {
    // ARRANGE
    axios.post.mockRejectedValue(new Error('Server Error'));

    // ACT + ASSERT
    await expect(quizService.createQuiz({ title: 'Test' }))
        .rejects.toThrow('Server Error');
});

// =============================================
// TEST 10 — getQuizById returns correct quiz
// =============================================
test('getQuizById returns the correct quiz', async () => {
    // ARRANGE
    const fakeQuiz = { quizId: 1, title: 'Math Quiz', description: 'Basic math' };
    axios.get.mockResolvedValue({ data: fakeQuiz });

    // ACT
    const response = await quizService.getQuizById(1);

    // ASSERT
    expect(response.data.quizId).toBe(1);
    expect(response.data.title).toBe('Math Quiz');
});