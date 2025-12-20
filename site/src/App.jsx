import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import QuizSelection from './pages/QuizSelection';
import Quiz from './pages/Quiz';
import QuizHistory from './pages/QuizHistory';
import Analytics from './pages/Analytics';
import NotFound from './pages/NotFound';

const basename = import.meta.env.BASE_URL?.replace(/\/$/, '') || '/';

function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <Router basename={basename}>
          <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-black text-gray-900 dark:text-white font-sans selection:bg-blue-500/30 transition-colors duration-300">
            {/* Skip to main content link for accessibility */}
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>

            <div className="fixed inset-0 bg-[url('/noise.svg')] opacity-20 pointer-events-none z-0"></div>
            <div className="fixed inset-0 bg-gradient-to-br from-blue-900/10 via-transparent to-purple-900/10 dark:from-blue-900/20 dark:via-black dark:to-purple-900/20 pointer-events-none z-0"></div>

            <Navbar />

            <main id="main-content" className="relative z-10 flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/quiz" element={<QuizSelection />} />
                <Route path="/quiz/:topic" element={<Quiz />} />
                <Route path="/history" element={<QuizHistory />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;
