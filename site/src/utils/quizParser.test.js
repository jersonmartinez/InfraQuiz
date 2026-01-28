import { describe, it, expect } from 'vitest';
import { parseQuizMarkdown } from './quizParser';

describe('quizParser', () => {
    it('should parse a simple question correctly', () => {
        const markdown = `
### 1. 🟢 Question One
A) Option A
B) Option B
C) Option C
D) Option D

**Correct Answer**: A
> This is an explanation.
        `;
        const result = parseQuizMarkdown(markdown);
        expect(result).toHaveLength(1);
        expect(result[0].question).toBe('Question One');
        expect(result[0].difficulty).toBe('easy');
        expect(result[0].options).toHaveLength(4);
        expect(result[0].correctAnswer).toBe('A');
        expect(result[0].explanation).toBe('This is an explanation.');
    });

    it('should handle different difficulties', () => {
        const markdown = `
### 1. 🔴 Hard Question
A) A
B) B
C) C
D) D
**Correct Answer**: B
> Hard explanation.

### 2. 🟡 Medium Question
A) A
B) B
C) C
D) D
**Correct Answer**: C
> Medium explanation.
        `;
        const result = parseQuizMarkdown(markdown);
        expect(result).toHaveLength(2);
        expect(result[0].difficulty).toBe('hard');
        expect(result[1].difficulty).toBe('medium');
    });

    it('should handle Spanish headers', () => {
        const markdown = `
### 1. Pregunta
A) A
B) B
C) C
D) D
**Respuesta correcta**: D
> Explicación.
        `;
        const result = parseQuizMarkdown(markdown);
        expect(result).toHaveLength(1);
        expect(result[0].correctAnswer).toBe('D');
    });

    it('should ignore non-question text', () => {
        const markdown = `
# Title
Some intro text.
### 1. 🟢 Actual Question
A) A
B) B
C) C
D) D
**Correct Answer**: A
> Explanation.
        `;
        const result = parseQuizMarkdown(markdown);
        expect(result).toHaveLength(1);
    });
});
