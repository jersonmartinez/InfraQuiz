# InfraQuiz Technical Documentation

## Overview
InfraQuiz is a modern, interactive web application designed to help DevOps and Cloud professionals master technologies like Docker, Kubernetes, Terraform, and AWS through categorized quizzes.

## Project Structure
- `/site`: The React frontend application built with Vite and Tailwind CSS.
- `/quizzes`: A collection of Markdown files organized by topic and language containing quiz questions.
- `.github/workflows`: CI/CD pipelines for deployment to GitHub Pages.

## Core Features Explained

### 1. Dynamic Quiz Engine
- **How it works**: The app fetches Markdown files directly from the `/quizzes` directory based on the selected topic and language.
- **Parser**: A custom utility (`site/src/utils/quizParser.js`) converts Markdown text into structured JSON objects (Question, Options, Correct Answer, Explanation).
- **Interactive Experience**: 
    - **Option Shuffling**: Options are randomized for each question to prevent memorization by position.
    - **Immediate Feedback**: Users get instant explanations after answering.
    - **Progress Tracking**: A visual bar shows current progress.
    - **Keyboard Shortcuts**: Power users can use 'A', 'B', 'C', 'D' and 'Enter'.

### 2. State & Persistence (Resume System)
- **Local Storage**: All progress is saved in the browser's `localStorage` via custom hooks (`useLocalStorage.js`).
- **Resume System**: If a user leaves a quiz midway, they can return and "Resume" from exactly where they left off, including their score and previous answers.
- **Session Protection**: A "Save & Exit" dialog ensures progress isn't lost accidentally.

### 3. Analytics & History
- **Quiz History**: Every completed quiz is stored with metrics: score, percentage, time spent, and date.
- **Analytics Dashboard**: 
    - Visualizes performance trends.
    - Tracks "Favorite Topics" based on frequency.
    - Calculates average and best scores.
- **Achievements**: A gamification engine awards badges (e.g., "First Perfect Score", "Quiz Master") based on user performance.

### 4. Personalization & UX
- **Theme Engine**: Support for Dark and Light modes with persistent preference.
- **Internationalization (i18n)**: Multi-language support (English/Spanish) using a custom `LanguageContext`.
- **Skeleton Loaders**: Provides perceived performance by showing placeholders during quiz loading.
- **Confetti Celebration**: Visual rewards for high scores (70%+).

---

## Simplification Plan
*Current Complexity*: The use of raw Markdown files is powerful but requires strict formatting.
*Proposed Simplification*:
1.  **Quiz Validation Script**: Create a tool to auto-verify that Markdown files follow the required structure before pushing.
2.  **Centralized State**: Consider moving some `localStorage` logic to a global state manager if the app grows significantly.
3.  **Component Consolidation**: Small UI components (Badges, Buttons) can be grouped into a single UI library within the project.

---

## Improvement Roadmap (Step-by-Step)

### Phase 1: Foundation & Stability (Immediate)
1.  **Fix Deployment Workflows**: Add `npm install` and `npm run build` steps to `.github/workflows/deploy.yml` to ensure the site actually runs on GitHub Pages.
2.  **Add Unit Tests**: Implement tests for the `quizParser` to ensure formatting errors in Markdown don't break the app.
3.  **Error Boundaries**: Add React Error Boundaries to prevent the whole app from crashing if a single quiz file is malformed.

### Phase 2: Feature Enhancement (Short-term)
1.  **Search & Filtering**: Add a search bar to the Topics page as the number of quizzes grows.
2.  **Flashcards Mode**: Implement a "Study Mode" where users see the answer/explanation first (Flashcards).
3.  **Global Leaderboard**: Optional feature using a lightweight backend (or Firebase) to compare scores with others.

### Phase 3: Content & Community (Long-term)
1.  **Quiz Contribution Guide**: Document how community members can add new quizzes.
2.  **PWA Optimization**: Enhance the Service Worker for better offline support (Caching quizzes offline).
3.  **AI Question Generator**: Integration with an LLM to generate draft questions from documentation URLs.
