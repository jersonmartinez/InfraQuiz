// Quiz Format Fixer - Ensures proper line breaks between options
// This script processes all quiz files and fixes formatting issues

const fs = require('fs');
const path = require('path');

// Function to fix quiz file format
function fixQuizFormat(content) {
    const lines = content.split('\n');
    const fixedLines = [];
    let inQuestionBlock = false;
    let lastLineWasOption = false;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        const nextLine = i < lines.length - 1 ? lines[i + 1].trim() : '';
        
        // Detect question start
        if (line.match(/^### (?:❓|🧠|💭|🤔|🔧|⚙️|🔍|🚀)/)) {
            inQuestionBlock = true;
            lastLineWasOption = false;
            fixedLines.push(lines[i]);
            
            // Ensure blank line after question
            if (nextLine && !nextLine.match(/^(?:📝|🔄|📦|🎯)/)) {
                fixedLines.push('');
            }
            continue;
        }
        
        // Detect options
        if (inQuestionBlock && line.match(/^(?:📝|🔄|📦|🎯)/)) {
            // Add blank line before first option if needed
            if (!lastLineWasOption && fixedLines[fixedLines.length - 1] !== '') {
                fixedLines.push('');
            }
            
            fixedLines.push(lines[i]);
            lastLineWasOption = true;
            continue;
        }
        
        // Detect explanation or correct answer
        if (inQuestionBlock && (line.includes('**Correct Answer:**') || line.includes('**Respuesta Correcta:**') ||
            line.includes('**Explanation:**') || line.includes('**Explicación:**'))) {
            // Ensure blank line before explanation
            if (fixedLines[fixedLines.length - 1] !== '') {
                fixedLines.push('');
            }
            fixedLines.push(lines[i]);
            lastLineWasOption = false;
            continue;
        }
        
        // Detect section separator
        if (line === '---') {
            inQuestionBlock = false;
            lastLineWasOption = false;
            // Ensure blank lines around separator
            if (fixedLines[fixedLines.length - 1] !== '') {
                fixedLines.push('');
            }
            fixedLines.push(lines[i]);
            fixedLines.push('');
            continue;
        }
        
        // Regular line
        fixedLines.push(lines[i]);
        lastLineWasOption = false;
    }
    
    return fixedLines.join('\n');
}

// Function to process all quiz files
function processQuizFiles() {
    const quizzesDir = './quizzes';
    const categories = fs.readdirSync(quizzesDir);
    
    categories.forEach(category => {
        const categoryPath = path.join(quizzesDir, category);
        if (!fs.statSync(categoryPath).isDirectory()) return;
        
        const languages = fs.readdirSync(categoryPath);
        languages.forEach(language => {
            const languagePath = path.join(categoryPath, language);
            if (!fs.statSync(languagePath).isDirectory()) return;
            
            const files = fs.readdirSync(languagePath);
            files.forEach(file => {
                if (file.endsWith('.md')) {
                    const filePath = path.join(languagePath, file);
                    console.log(`Processing: ${filePath}`);
                    
                    try {
                        const content = fs.readFileSync(filePath, 'utf8');
                        const fixedContent = fixQuizFormat(content);
                        
                        // Only write if content changed
                        if (content !== fixedContent) {
                            fs.writeFileSync(filePath, fixedContent, 'utf8');
                            console.log(`✅ Fixed: ${filePath}`);
                        } else {
                            console.log(`✓ Already correct: ${filePath}`);
                        }
                    } catch (error) {
                        console.error(`❌ Error processing ${filePath}:`, error.message);
                    }
                }
            });
        });
    });
}

// Run the script
if (require.main === module) {
    console.log('🔧 Starting quiz format fixing...');
    processQuizFiles();
    console.log('✅ Quiz format fixing completed!');
}

module.exports = { fixQuizFormat, processQuizFiles };