# Task: Finalize Site Cleanup and Integration

## Status
- [x] Fix `flashcards.js` corruption
- [x] Update HTML files to link modular CSS
- [x] Refactor Quiz Data Fetching (`quiz-service.js`)
- [ ] Fix `script.js` structure and missing `initializeInfraQuiz`
- [ ] Remove redundant code from `script.js`
- [ ] Verify all modules are correctly integrated
- [ ] Create unit tests for `quiz-parser.js`

## Context
The `script.js` file appears to be malformed. The `initializeInfraQuiz` function is missing, and the `initializeAccessibility` function seems to end abruptly with an object export that doesn't make sense in that context. We need to restore `initializeInfraQuiz` and clean up the file.

## Plan

1.  **Fix `script.js`**:
    *   Reconstruct `initializeInfraQuiz` function.
    *   Ensure `initializeAccessibility` is properly closed.
    *   Remove `loadQuizFile` (replaced by `QuizService`).
    *   Ensure `window.InfraQuiz` exports are correct.

2.  **Verify Integration**:
    *   Check that `index.html` loads categories correctly.
    *   Check that `quiz.html` loads questions using `QuizService`.
    *   Check that `flashcards.html` works with the fixed `flashcards.js`.

3.  **Unit Tests**:
    *   Create `tests/quiz-parser.test.js` to test the regex parsing logic.
