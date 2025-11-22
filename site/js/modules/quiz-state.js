/**
 * Quiz State Module
 * Handles the state of the current quiz session
 */
(function () {
    window.InfraQuiz = window.InfraQuiz || {};

    const state = {
        currentQuiz: [],
        currentQuestionIndex: 0,
        score: 0,
        userAnswers: [],
        totalQuestions: 0,
        startTime: 0
    };

    function reset() {
        state.currentQuestionIndex = 0;
        state.score = 0;
        state.userAnswers = [];
        state.startTime = Date.now();
        // Note: We don't clear currentQuiz here as we might want to restart the same quiz
    }

    function setQuiz(quiz) {
        state.currentQuiz = quiz;
        state.totalQuestions = quiz.length;
        reset();
    }

    function getCurrentQuestion() {
        if (!state.currentQuiz || state.currentQuestionIndex >= state.currentQuiz.length) {
            return null;
        }
        return state.currentQuiz[state.currentQuestionIndex];
    }

    function nextQuestion() {
        state.currentQuestionIndex++;
        return state.currentQuestionIndex < state.totalQuestions;
    }

    function addAnswer(isCorrect) {
        state.userAnswers.push({
            questionIndex: state.currentQuestionIndex,
            isCorrect: isCorrect
        });
        if (isCorrect) {
            state.score++;
        }
    }

    function isFinished() {
        return state.currentQuestionIndex >= state.totalQuestions;
    }

    window.InfraQuiz.State = {
        data: state,
        reset,
        setQuiz,
        getCurrentQuestion,
        nextQuestion,
        addAnswer,
        isFinished
    };
})();
