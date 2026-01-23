const fs = require('fs');
const path = require('path');

const QUIZZES_DIR = path.join(__dirname, '../quizzes');

/**
 * Basic validator for InfraQuiz Markdown files.
 * Checks for:
 * 1. Question headers (### N.)
 * 2. All 4 options (A), B), C), D))
 * 3. Correct Answer section
 * 4. Explanation section
 */
function validateQuizFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n').map(l => l.trim());
    const errors = [];

    let currentQuestion = 0;
    let hasOptions = { A: false, B: false, C: false, D: false };
    let hasCorrectAnswer = false;
    let hasExplanation = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.match(/^###\s+\d+\./)) {
            // New question found, validate previous one first
            if (currentQuestion > 0) {
                if (!hasOptions.A || !hasOptions.B || !hasOptions.C || !hasOptions.D) {
                    errors.push(`Question ${currentQuestion} is missing options.`);
                }
                if (!hasCorrectAnswer) {
                    errors.push(`Question ${currentQuestion} is missing '**Correct Answer**'.`);
                }
                if (!hasExplanation) {
                    errors.push(`Question ${currentQuestion} is missing an explanation.`);
                }
            }

            currentQuestion++;
            hasOptions = { A: false, B: false, C: false, D: false };
            hasCorrectAnswer = false;
            hasExplanation = false;
            continue;
        }

        if (line.startsWith('A)')) hasOptions.A = true;
        if (line.startsWith('B)')) hasOptions.B = true;
        if (line.startsWith('C)')) hasOptions.C = true;
        if (line.startsWith('D)')) hasOptions.D = true;
        if (line.startsWith('**Correct Answer**')) hasCorrectAnswer = true;
        if (line.startsWith('>') || (hasCorrectAnswer && line.length > 0 && !line.match(/^[A-D]\)/))) {
            // Very simple check for explanation
            if (hasCorrectAnswer && !line.startsWith('**Correct Answer**')) {
                hasExplanation = true;
            }
        }
    }

    // Final question validation
    if (currentQuestion > 0) {
        if (!hasOptions.A || !hasOptions.B || !hasOptions.C || !hasOptions.D) errors.push(`Question ${currentQuestion} is missing options.`);
        if (!hasCorrectAnswer) errors.push(`Question ${currentQuestion} is missing '**Correct Answer**'.`);
        if (!hasExplanation) errors.push(`Question ${currentQuestion} is missing an explanation.`);
    }

    return {
        valid: errors.length === 0,
        errors,
        questionCount: currentQuestion
    };
}

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

console.log('🔍 Starting Quiz Validation...');
let totalFiles = 0;
let totalErrors = 0;

walkDir(QUIZZES_DIR, (filePath) => {
    if (filePath.endsWith('.md')) {
        totalFiles++;
        const result = validateQuizFile(filePath);
        const relativePath = path.relative(QUIZZES_DIR, filePath);

        if (!result.valid) {
            console.error(`❌ ${relativePath}: Found ${result.errors.length} errors.`);
            result.errors.forEach(err => console.error(`   - ${err}`));
            totalErrors += result.errors.length;
        } else {
            console.log(`✅ ${relativePath} (${result.questionCount} questions)`);
        }
    }
});

console.log('\n--- Summary ---');
console.log(`Files scanned: ${totalFiles}`);
console.log(`Total errors: ${totalErrors}`);

if (totalErrors > 0) {
    process.exit(1);
} else {
    console.log('🚀 All quizzes are valid!');
    process.exit(0);
}
