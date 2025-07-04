# 🤝 Contributing to InfraQuiz

¡Gracias por tu interés en contribuir a InfraQuiz! Este documento te guiará a través del proceso de contribución.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Adding New Quizzes](#adding-new-quizzes)
- [Quiz Format Guidelines](#quiz-format-guidelines)
- [Development Setup](#development-setup)
- [Submitting Changes](#submitting-changes)

## 🚀 Getting Started

1. **Fork the repository** - Click the "Fork" button on GitHub
2. **Clone your fork** - `git clone https://github.com/yourusername/InfraQuiz.git`
3. **Create a feature branch** - `git checkout -b feature/your-feature-name`
4. **Make your changes** - Follow the guidelines below
5. **Test your changes** - Ensure everything works locally
6. **Submit a pull request** - We'll review and merge your changes

## 📝 Adding New Quizzes

### Quiz File Structure

Create new quiz files in the `quizzes/` directory following this naming convention:
- `docker.md` - Docker and containerization
- `kubernetes.md` - Kubernetes orchestration
- `cicd.md` - CI/CD pipelines
- `monitoring.md` - Monitoring and observability
- `security.md` - DevSecOps and security

### Quiz Content Format

Each quiz file should follow this structure:

```markdown
# 🐳 Docker Quiz

## 🟢 Beginner Level

### ❓ What's the main purpose of Docker containers? 🟢

📝 Package applications with dependencies
🔄 Virtualize entire operating systems
📦 Replace virtual machines completely
🎯 Speed up application development

**Correct Answer:**
📝 Package applications with dependencies

**Explanation:**
💡 Docker containers package your application with all its dependencies, ensuring it runs consistently across different environments. Like shipping your app in a box! 📦

---
```

## 📋 Quiz Format Guidelines

### Question Structure

1. **Start with an emoji** - Use relevant emojis (❓, 🧠, 💭, 🤔, 🔧, ⚙️, 🔍, 🚀)
2. **Clear question text** - Maximum 1.5 lines, be specific and engaging
3. **End with difficulty** - 🟢 (Beginner), 🟡 (Intermediate), 🔴 (Advanced)

### Answer Options

1. **Exactly 4 options** - Each starting with an emoji (📝, 🔄, 📦, 🎯)
2. **Maximum 80 characters** - Keep options concise
3. **One correct answer** - Marked with 📝 (first option)
4. **Plausible distractors** - Based on common mistakes

### Explanations

1. **Start with an emoji** - (💡, 🔍, ⚡, 🩺, 🔧, 🎯)
2. **2-3 lines maximum** - Educational and concise
3. **Real technical value** - Provide genuine learning
4. **Light tone** - Professional but approachable

### Difficulty Levels

- **🟢 Beginner**: Basic concepts, definitions, simple commands
- **🟡 Intermediate**: Configuration, best practices, troubleshooting
- **🔴 Advanced**: Complex scenarios, optimization, architecture decisions

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+ (for local development)
- Git
- A modern web browser

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/InfraQuiz.git
   cd InfraQuiz
   ```

2. **Serve the site locally**
   ```bash
   # Using Python (if available)
   cd site
   python -m http.server 8000
   
   # Or using Node.js
   npx serve site
   
   # Or using PHP
   php -S localhost:8000 -t site
   ```

3. **Open in browser**
   - Navigate to `http://localhost:8000`
   - Test the quizzes and functionality

### Testing Your Changes

1. **Test quiz parsing** - Ensure your markdown is parsed correctly
2. **Test responsiveness** - Check on mobile and desktop
3. **Test accessibility** - Use keyboard navigation
4. **Test browser compatibility** - Chrome, Firefox, Safari, Edge

## 📤 Submitting Changes

### Pull Request Guidelines

1. **Clear title** - Describe the change briefly
2. **Detailed description** - Explain what and why you changed
3. **Screenshots** - If UI changes are involved
4. **Test coverage** - Mention what you tested

### Commit Message Format

Follow the established format:
```
[ENV] ID-FEATURE: Brief description of changes

Example:
[DEV] INFRA-001: Add Docker containerization quiz
[STAGE] INFRA-002: Fix quiz parsing for special characters
```

### Code Review Process

1. **Automated checks** - GitHub Actions will run tests
2. **Manual review** - Maintainers will review your changes
3. **Feedback** - Address any comments or suggestions
4. **Merge** - Once approved, your changes will be merged

## 🎯 Best Practices

### Quiz Creation

- **Research thoroughly** - Ensure technical accuracy
- **Test commands** - Verify CLI examples work
- **Include common mistakes** - Use realistic distractors
- **Keep explanations concise** - Focus on key learning points
- **Use consistent terminology** - Follow industry standards

### Code Quality

- **Follow existing patterns** - Maintain consistency
- **Add comments** - Explain complex logic
- **Test edge cases** - Handle errors gracefully
- **Optimize performance** - Keep the site fast

### Documentation

- **Update README** - If adding new features
- **Add inline comments** - For complex code
- **Include examples** - Show how to use new features

## 🐛 Reporting Issues

### Bug Reports

When reporting bugs, please include:

1. **Clear description** - What happened vs. what you expected
2. **Steps to reproduce** - Detailed steps to recreate the issue
3. **Environment details** - Browser, OS, device
4. **Screenshots** - If visual issues
5. **Console errors** - Any error messages

### Feature Requests

For new features:

1. **Clear use case** - What problem does it solve?
2. **Proposed solution** - How should it work?
3. **Mockups** - Visual examples if applicable
4. **Priority** - How important is this feature?

## 📞 Getting Help

- **GitHub Issues** - For bugs and feature requests
- **Discussions** - For questions and general discussion
- **Documentation** - Check existing docs first

## 🎉 Recognition

Contributors will be recognized in:

- **README.md** - List of contributors
- **Release notes** - Credit for significant contributions
- **GitHub profile** - Public contribution history

---

Thank you for contributing to InfraQuiz! Your efforts help make DevOps learning more accessible and engaging for everyone. 🚀 