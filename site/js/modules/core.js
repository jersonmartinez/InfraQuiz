/**
 * Core functionality for InfraQuiz
 * Handles theme, language, and shared UI components
 */

window.InfraQuiz = window.InfraQuiz || {};

// === STATE ===
const state = {
    language: localStorage.getItem('language') || 'es',
    darkMode: localStorage.getItem('darkMode') === 'true',
    translations: {}
};

// === THEME MANAGEMENT ===
function initializeTheme() {
    const themeSwitch = document.getElementById('themeSwitch');

    // Apply saved theme
    if (state.darkMode) {
        document.body.classList.add('dark-mode');
        if (themeSwitch) themeSwitch.classList.add('active');
    }

    if (themeSwitch) {
        themeSwitch.addEventListener('click', () => {
            state.darkMode = !state.darkMode;
            document.body.classList.toggle('dark-mode');
            themeSwitch.classList.toggle('active');
            localStorage.setItem('darkMode', state.darkMode);
        });
    }
}

// === LANGUAGE MANAGEMENT ===
async function loadTranslations() {
    // In a real app, we might fetch these. For now, we'll keep them simple or load from a file if needed.
    // If translations are large, they should be in a JSON file.
    // For this refactor, we'll assume they might be loaded or we can keep a minimal set here.
    // But wait, script.js didn't have the actual translations, it just had getTranslations() which looked at window.InfraQuiz.translations.
    // We need to find where translations are defined. They might be in a separate file or missing from my view.
    // I'll check if there's a translations file.
}

function initializeLanguage() {
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        if (state.language === 'en') {
            languageToggle.classList.add('active');
        }

        languageToggle.addEventListener('click', () => {
            state.language = state.language === 'es' ? 'en' : 'es';
            languageToggle.classList.toggle('active');
            localStorage.setItem('language', state.language);
            location.reload(); // Simple reload to apply language changes
        });
    }
}

// === SHARED UI ===
function initializeSharedUI() {
    // Scroll to Top
    const scrollBtn = document.getElementById('scrollToTopBtn');
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) scrollBtn.classList.add('visible');
            else scrollBtn.classList.remove('visible');
        });
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Footer Year
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Navbar Smooth Scroll
    document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.getElementById(href.substring(1));
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// === NOTIFICATIONS ===
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 300px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);';
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} me-2"></i>
            <span>${message}</span>
            <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 5000);
}

// === SERVICE WORKER ===
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            const isLocal = ['localhost', '127.0.0.1'].includes(window.location.hostname);
            navigator.serviceWorker.register(isLocal ? './sw.js' : '/sw.js')
                .then(reg => console.log('✅ SW Registered'))
                .catch(err => console.warn('❌ SW Failed:', err));
        });
    }
}

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    initializeLanguage();
    initializeSharedUI();
    registerServiceWorker();

    // Initialize AOS if available
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true });
    }
});

// Export to global scope
Object.assign(window.InfraQuiz, {
    state,
    showNotification
});
