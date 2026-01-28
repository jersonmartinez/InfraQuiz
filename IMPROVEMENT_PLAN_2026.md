# InfraQuiz: Modernization & Improvement Plan

This document outlines the step-by-step plan to simplify, document, and improve the InfraQuiz application.

## 1. Simplification & Refactoring (Code Health)

### Step 1: Modularize Quiz Page
- **Problem**: `Quiz.jsx` is 400+ lines long and handles too many responsibilities (Timer, Save Dialog, Progress, Results, Shuffling).
- **Action**: Extract UI components into `site/src/components/quiz/`:
    - `QuizResults.jsx`
    - `QuizOverlay.jsx` (Pause/Save Dialogs)
    - `QuizOption.jsx`
- **Benefit**: Makes the code "understandable" and easier to maintain.

### Step 2: Centralize Quiz Fetching
- **Problem**: Both `Quiz.jsx` and `QuizSelection.jsx` hardcode references to `questions1.md`.
- **Action**: Create a service `site/src/services/quizService.js` to manage fetching and counting questions.
- **Benefit**: Easier to add more question levels/files in the future.

### Step 3: Streamline LocalStorage
- **Problem**: Multiple hooks handle `localStorage` separately.
- **Action**: Consolidate into a single `useStorage` hook or use a small library like `zustand` if complexity increases.

## 2. Documentation (Understandability)

### Step 4: Component Documentation
- Add JSDoc comments to all components explaining their props and purpose.
- Create a `COMPONENT_MAP.md` to visualize how pieces fit together.

### Step 5: Content Contributor Guide
- Create `CONTRIBUTING_QUIZZES.md` explaining the exact Markdown structure required for the parser to work, making it easy for non-developers to add content.

## 3. Deployment & Reliability

### Step 6: Fix CI/CD Pipeline
- **Problem**: Current `.github/workflows/deploy.yml` doesn't build the Vite project.
- **Action**: Update the workflow to:
    1.  Install dependencies (`npm install`).
    2.  Build the project (`npm run build`).
    3.  Copy `quizzes/` to the `dist/` folder.
    4.  Deploy the `dist/` folder.
- **Benefit**: ✅ COMPLETED - Pipeline is now robust, parallelized, and includes linting/testing.

### Step 7: Add Basic Testing
- **Action**: Implement Vitest for the `quizParser` utility to prevent breaking the app when updating Markdown content.
- **Benefit**: ✅ COMPLETED - Vitest integrated with unit tests for the parser.

---

## Technical Improvement Roadmap (Paso a Paso)

### Phase 1: Stability (Week 1)
1.  **Fix Deployment Workflow**: ✅ COMPLETED - GitHub Pages now builds and deploys correctly.
2.  **Validator Script**: ✅ COMPLETED - Integrated `scripts/validate-quizzes.js` into the pipeline.
3.  **Basic Testing**: ✅ COMPLETED - Unit tests for `quizParser.js` added.

### Phase 2: Refactoring (Week 2)
1.  **Extract Components**: ✅ COMPLETED - Split `Quiz.jsx` into smaller, reusable parts in `src/components/quiz/`.
2.  **Service Layer**: ✅ COMPLETED - Implemented `quizService.js`.

### Phase 3: Features & Interactions ✅ COMPLETED
1.  **Multiple Levels/Sets**: 
    - [x] Create a "Set Selector" UI in the Quiz selection page (S1-S8 buttons).
    - [x] Update `useQuiz` and `Quiz.jsx` to support dynamic set selection via URL parameter.
2.  **Naming Normalization**: ✅ COMPLETED - Standardized all files to `questions[N].md`.
3.  **Difficulty Improvements**:
    - [x] Filter questions by difficulty (🟢 Beginner, 🟡 Intermediate, 🔴 Advanced) via start overlay.
    - [x] Add difficulty indicators to the results and review screens.
4.  **Enhanced Error UI & Resilience**:
    - [x] Improved "No Questions Found" screen with specific troubleshooting.
    - [x] Added "Try in English" button and set suggestions.
5.  **New Quiz Interactions**:
    - [x] **Review Mode**: Detailed question/explanation list after completing a quiz.
    - [x] **Flashcard Mode**: Study mode with self-assessment (I knew it! / I missed it).
    - [x] **Timed Challenges**: 10-minute challenge mode with countdown and auto-finish.
6.  **Search & Tags**: Enhanced Topic selection with category tabs (Cloud, Containers, IaC, etc).

---

## Feature Summary (Resumen de Funcionalidades)

| Feature | Description | Status |
| :--- | :--- | :--- |
| **Quiz Engine** | Dynamic Markdown-based quiz with randomization. | ✅ Working |
| **Persistence** | Auto-save and Resume functionality via LocalStorage. | ✅ Working |
| **Analytics** | Dashboard showing performance metrics and trends. | ✅ Working |
| **Achievements** | Gamification system with badges and high-score rewards. | ✅ Working |
| **i18n** | Multi-language support (English/Spanish). | ✅ Working |
| **UI/UX** | Dark/Light mode, animations, and responsive design. | ✅ Working |
| **Modular Architecture** | Clean separation of UI and logic components. | ✅ COMPLETED |
