/**
 * Home Page Controller
 * Handles categories rendering and random quiz start
 */

async function loadCategories() {
    try {
        const response = await fetch('config/categories.json');
        if (!response.ok) throw new Error('Failed to load categories');
        return await response.json();
    } catch (error) {
        console.error('❌ Error loading categories:', error);
        return [];
    }
}

function renderCategories(categories) {
    const container = document.getElementById('quiz-categories-container');
    if (!container) return;

    const lang = window.InfraQuiz.state.language;

    container.innerHTML = categories.map((tech, index) => {
        const difficultyButtons = tech.difficulties.map(diff => `
            <button class="difficulty-btn ${diff}" 
                    onclick="startQuiz('${tech.id}', '${diff}')">
                ${diff.charAt(0).toUpperCase() + diff.slice(1)}
            </button>
        `).join('');

        return `
            <div class="col-lg-4 col-md-6 mb-4" data-aos="fade-up" data-aos-delay="${index * 100}">
                <div class="quiz-card h-100">
                    <div class="card-body text-center">
                        <div class="mb-3">
                            <i class="bi ${tech.icon}" style="font-size: 3rem; color: ${tech.color};"></i>
                        </div>
                        <h5 class="card-title">${tech.name[lang]}</h5>
                        <p class="card-text">${tech.description[lang]}</p>
                        <div class="difficulty-buttons d-flex justify-content-center gap-2 flex-wrap">
                            ${difficultyButtons}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function startQuiz(category, level) {
    const lang = window.InfraQuiz.state.language;
    window.location.href = `quiz.html?category=${category}&level=${level}&lang=${lang}`;
}

async function startRandomQuiz(categories) {
    if (!categories || categories.length === 0) return;

    const randomTech = categories[Math.floor(Math.random() * categories.length)];
    const randomDiff = randomTech.difficulties[Math.floor(Math.random() * randomTech.difficulties.length)];

    startQuiz(randomTech.id, randomDiff);
}

// Initialize Home
document.addEventListener('DOMContentLoaded', async () => {
    const categories = await loadCategories();
    renderCategories(categories);

    const randomBtn = document.getElementById('startRandomQuizBtn'); // Ensure ID matches HTML
    if (randomBtn) {
        randomBtn.addEventListener('click', () => startRandomQuiz(categories));
    }

    // Expose startQuiz globally for inline onclick handlers
    window.startQuiz = startQuiz;
});
