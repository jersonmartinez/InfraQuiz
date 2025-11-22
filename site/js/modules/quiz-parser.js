/**
 * Quiz Parser Module
 * Handles parsing of Markdown quiz content
 */
(function () {
    window.InfraQuiz = window.InfraQuiz || {};

    function parseQuizContent(markdown) {
        console.log('📝 Parsing quiz content...');

        const questions = [];
        const lines = markdown.split('\n');
        let currentQuestion = null;
        let currentOptions = [];
        let isInExplanation = false;
        let explanationText = '';

        // Enhanced regex patterns
        const questionPattern = /^###\s*\d+\.\s*(.+)/;
        const optionPattern = /^([A-D])\)\s*(.+)/;
        const answerPattern = /^\*\*(?:Respuesta correcta|Correct Answer)\*\*:\s*([A-D])\)/;

        console.log('🔍 Parsing patterns initialized');

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            // Skip empty lines but preserve them in explanation
            if (!line) {
                if (isInExplanation) {
                    explanationText += '\n';
                }
                continue;
            }

            // Question detection
            const questionMatch = line.match(questionPattern);
            if (questionMatch) {
                // Save previous question
                if (currentQuestion && currentOptions.length > 0) {
                    currentQuestion.options = currentOptions;
                    if (explanationText.trim()) {
                        currentQuestion.explanation = explanationText.trim();
                    }
                    questions.push(currentQuestion);
                }

                // Extract emoji and text from question
                const fullQuestionText = questionMatch[1];
                const { emoji, text, difficulty } = extractEmojiAndText(fullQuestionText);

                currentQuestion = {
                    text: text,
                    emoji: emoji,
                    difficulty: difficulty || 'beginner',
                    options: [],
                    explanation: ''
                };

                currentOptions = [];
                isInExplanation = false;
                explanationText = '';
                continue;
            }

            // Option detection with emoji extraction
            const optionMatch = line.match(optionPattern);
            if (optionMatch && currentQuestion) {
                const letter = optionMatch[1];
                const fullOptionText = optionMatch[2];

                // Extract emoji from option text
                const { emoji, text } = extractEmojiAndText(fullOptionText);

                currentOptions.push({
                    letter: letter,
                    text: text,
                    emoji: emoji,
                    isCorrect: false
                });
                continue;
            }

            // Answer detection
            const answerMatch = line.match(answerPattern);
            if (answerMatch && currentOptions.length > 0) {
                const correctLetter = answerMatch[1];
                const correctOption = currentOptions.find(opt => opt.letter === correctLetter);
                if (correctOption) {
                    correctOption.isCorrect = true;
                }
                continue;
            }

            // Explanation detection
            if (line.startsWith('>')) {
                if (!isInExplanation) {
                    isInExplanation = true;
                    explanationText = line.substring(1).trim();
                } else {
                    explanationText += ' ' + line.substring(1).trim();
                }
                continue;
            }

            // End explanation when we hit a new question or non-explanation content
            if (isInExplanation && !line.startsWith('>')) {
                if (line.match(questionPattern)) {
                    isInExplanation = false;
                } else {
                    isInExplanation = false;
                }
            }
        }

        // Save last question
        if (currentQuestion && currentOptions.length > 0) {
            currentQuestion.options = currentOptions;
            if (explanationText.trim()) {
                currentQuestion.explanation = explanationText.trim();
            }
            questions.push(currentQuestion);
        }

        console.log(`✅ Parsed ${questions.length} questions`);
        return questions;
    }

    /**
     * Extract emoji, text and difficulty from a text string
     */
    function extractEmojiAndText(text) {
        if (!text) return { emoji: '', text: '', difficulty: 'beginner' };

        // Enhanced emoji pattern
        const emojiPattern = /([\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|🔧|📝|⚙️|🛠️|💻|🖥️|📊|📈|📉|🔍|🔎|⭐|✨|💡|🎯|🚀|🔒|🔓|⚡|🌟|💯|📚|📖|🎓|🏆|✅|❌|⚠️|ℹ️|💭|🧠|🔗|🌐|📱|💾|🗄️|📂|📁|🔍|🔎|📝|✏️|📄|📋|📌|📍|🎨|🖼️|🖊️|✒️|🖋️|📐|📏|🔢|💰|💳|💎|🏅|🥇|🥈|🥉|🔄|📦)\s*/u;

        // Difficulty color emojis
        const difficultyPattern = /(🟢|🟡|🔴)/g;

        let emoji = '';
        let cleanText = text;
        let difficulty = 'beginner';

        // Extract main emoji (first one found)
        const emojiMatches = text.match(emojiPattern);
        if (emojiMatches && emojiMatches.length > 0) {
            emoji = emojiMatches[0];
        }

        // Extract difficulty from color emoji
        const difficultyMatches = text.match(difficultyPattern);
        if (difficultyMatches) {
            const colorEmoji = difficultyMatches[0];
            switch (colorEmoji) {
                case '🟢': difficulty = 'beginner'; break;
                case '🟡': difficulty = 'intermediate'; break;
                case '🔴': difficulty = 'advanced'; break;
            }
        }

        // Clean text by removing emojis
        cleanText = text.replace(emojiPattern, '').replace(difficultyPattern, '').trim();

        return { emoji, text: cleanText, difficulty };
    }

    window.InfraQuiz.Parser = {
        parseQuizContent,
        extractEmojiAndText
    };
})();
