export const parseQuizMarkdown = (markdown) => {
    const questions = [];
    const lines = markdown.split('\n').map(l => l.trim());

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        // Match ### N. followed by ANY emoji
        const isQuestion = line.match(/^###\s+\d+\./);

        if (!isQuestion) continue;

        const question = {
            id: questions.length + 1,
            question: '',
            difficulty: 'medium',
            options: [],
            correctAnswer: '',
            explanation: ''
        };

        // Extract difficulty
        if (line.includes('🟢')) question.difficulty = 'easy';
        else if (line.includes('🔴')) question.difficulty = 'hard';
        else if (line.includes('🟡')) question.difficulty = 'medium';

        // Remove ### N. and difficulty emojis, but KEEP the question emoji
        question.question = line
            .replace(/^###\s+\d+\.\s*/, '') // Remove ### 1. 
            .replace(/[🟢🟡🔴]/g, '')       // Remove ONLY difficulty emojis
            .trim();

        i++; // Move to next line

        // Collect options A, B, C, D
        while (i < lines.length && !lines[i].match(/^\*\*(Correct Answer|Respuesta correcta)\*\*/i)) {
            if (lines[i].match(/^[A-D]\)/)) {
                const letter = lines[i].match(/^([A-D])\)/)[1];
                const text = lines[i].replace(/^[A-D]\)\s*/, '').trim();
                question.options.push({ letter, text });
            }
            i++;
        }

        // Get correct answer
        if (i < lines.length && lines[i].match(/^\*\*(Correct Answer|Respuesta correcta)\*\*/i)) {
            question.correctAnswer = lines[i].replace(/^\*\*(Correct Answer|Respuesta correcta)\*\*:/i, '').trim();
            i++;
        }

        // Collect explanation
        while (i < lines.length) {
            // Stop at next question
            if (lines[i].match(/^###\s+\d+\./)) {
                i--;
                break;
            }

            // Stop at empty line after we have explanation
            if (!lines[i] && question.explanation) {
                break;
            }

            // Add explanation text
            if (lines[i] && !lines[i].startsWith('**')) {
                const text = lines[i].replace(/^>\s*/, '').trim();
                if (text) {
                    question.explanation += (question.explanation ? ' ' : '') + text;
                }
            }

            i++;
        }

        // Add question if it has options
        if (question.options.length > 0) {
            questions.push(question);
        }
    }

    return questions;
};
