# 🧠 InfraQuiz - Interactive DevOps Learning Platform

A modern, interactive quiz platform designed to help DevOps professionals and enthusiasts test and improve their knowledge across various technologies and tools.

## 🚀 Features

### ✨ Modern Web Interface
- **Responsive Design**: Beautiful, mobile-first design that works on all devices
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Bilingual Support**: Full Spanish and English language support
- **Smooth Animations**: Engaging animations and transitions throughout the interface
- **Modern UI/UX**: Clean, professional design with intuitive navigation

### 🎯 Interactive Quizzes
- **21 Questions per Quiz**: Comprehensive coverage of each topic
- **3 Difficulty Levels**: Beginner (🟢), Intermediate (🟡), Advanced (🔴)
- **Real-time Feedback**: Immediate feedback with detailed explanations
- **Progress Tracking**: Visual progress indicators and statistics
- **Score Analytics**: Detailed results with accuracy and time tracking

### 📚 Technology Categories
- **Bash Scripting** - Shell scripting fundamentals and automation
- **Python Automation** - Python for DevOps and automation tasks
- **Terraform** - Infrastructure as Code with HashiCorp Terraform
- **AWS** - Amazon Web Services and cloud computing
- **Docker** - Containerization with Docker
- **Kubernetes** - Container orchestration with Kubernetes
- **Ansible** - Automation with Ansible
- **GitHub Actions** - CI/CD with GitHub Actions
- **CI/CD** - Continuous Integration and Delivery concepts
- **Monitoring** - System and application monitoring
- **Security** - DevSecOps practices and principles
- **Networking** - Network fundamentals for DevOps
- **Databases** - Database concepts and management

### 🌟 Enhanced Features
- **Random Quiz Mode**: Start a random quiz from any category
- **Tooltips**: Helpful information on hover
- **Accessibility**: Full keyboard navigation and screen reader support
- **Performance Optimized**: Fast loading and smooth interactions
- **Cross-browser Compatible**: Works on all modern browsers

## 🛠️ Technical Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid and Flexbox
- **JavaScript (ES6+)** - Interactive functionality
- **MDBootstrap** - UI framework for components
- **Bootstrap Icons** - Icon library
- **AOS (Animate On Scroll)** - Scroll animations

### Features
- **Local Storage** - User preferences persistence
- **Fetch API** - Dynamic content loading
- **CSS Custom Properties** - Theme management
- **Responsive Design** - Mobile-first approach

## 📁 Project Structure

```
InfraQuiz/
├── site/                          # Web application files
│   ├── index.html                 # Main landing page
│   ├── quiz.html                  # Quiz interface page
│   ├── styles.css                 # Enhanced CSS styles
│   ├── script.js                  # Main JavaScript functionality
│   └── quiz_page.js              # Quiz-specific JavaScript
├── quizzes/                       # Quiz content (markdown files)
│   ├── bash/
│   │   ├── en/questions1.md
│   │   └── es/cuestionario1.md
│   ├── python/
│   │   ├── en/questions1.md
│   │   └── es/cuestionario1.md
│   ├── terraform/
│   │   ├── en/questions1.md
│   │   └── es/cuestionario1.md
│   └── [other technologies]/
├── cursor-rules.mdc              # Development guidelines
└── README.md                     # This file
```

## 🎨 Design System

### Color Palette
- **Primary**: #007bff (Blue)
- **Success**: #28a745 (Green)
- **Warning**: #ffc107 (Yellow)
- **Danger**: #dc3545 (Red)
- **Info**: #17a2b8 (Cyan)
- **Custom Colors**: Purple, Orange, Pink, Teal, Brown for categories

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Responsive**: Scales appropriately across devices

### Animations
- **Smooth Transitions**: 0.3s ease for interactive elements
- **Hover Effects**: Transform and shadow changes
- **Loading States**: Spinner animations
- **Feedback Animations**: Success/error states with visual feedback

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (for development)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/jersonmartinez/InfraQuiz.git
   cd InfraQuiz
   ```

2. Serve the files using a local web server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. Open your browser and navigate to `http://localhost:8000/site/`

### Development
- Edit quiz content in the `quizzes/` directory
- Modify styles in `site/styles.css`
- Update functionality in `site/script.js` and `site/quiz_page.js`

## 📝 Quiz Format

Each quiz follows a specific markdown format:

```markdown
### ❓ Question text here? 🟢

📝 Correct answer (starts with 📝)
🔄 Incorrect option 1
📦 Incorrect option 2
🎯 Incorrect option 3

**Correct Answer:**
📝 Correct answer

**Explanation:**
💡 Detailed explanation with emoji and context
```

### Difficulty Levels
- 🟢 **Beginner**: Basic concepts and fundamentals
- 🟡 **Intermediate**: Practical applications and common scenarios
- 🔴 **Advanced**: Complex topics and best practices

## 🌐 Deployment

### GitHub Pages
The site is designed to work with GitHub Pages. Simply push your changes to the main branch and enable GitHub Pages in your repository settings.

### Other Hosting
The static files can be deployed to any web hosting service:
- Netlify
- Vercel
- AWS S3
- Azure Static Web Apps
- Any traditional web hosting

## 🔧 Configuration

### Language Settings
- Default language is English
- Users can switch between English and Spanish
- Language preference is saved in localStorage

### Theme Settings
- Default theme is light mode
- Dark mode can be toggled via the navbar
- Theme preference is saved in localStorage

## 📊 Quiz Statistics

The platform tracks and displays:
- **Score**: Correct answers out of total questions
- **Accuracy**: Percentage of correct answers
- **Time**: Time taken to complete the quiz
- **Progress**: Real-time progress through questions

## 🤝 Contributing

### Adding New Quizzes
1. Create a new directory in `quizzes/[technology]/`
2. Add `en/questions1.md` for English
3. Add `es/cuestionario1.md` for Spanish
4. Follow the established markdown format
5. Update the technologies array in `script.js`

### Code Style
- Follow the existing code structure
- Use meaningful variable and function names
- Add comments for complex logic
- Ensure responsive design
- Test across different browsers

### Quiz Content Guidelines
- Keep questions concise and clear
- Provide 4 answer options (A, B, C, D)
- Include detailed explanations
- Use appropriate difficulty levels
- Add relevant emojis for visual appeal

## 🐛 Known Issues

- Quiz loading requires internet connection (for GitHub raw content)
- Some older browsers may not support all CSS features
- Mobile devices may have slight performance differences

## 🔮 Future Enhancements

- [ ] Offline support with Service Workers
- [ ] User accounts and progress tracking
- [ ] More quiz categories and topics
- [ ] Advanced analytics and reporting
- [ ] Social sharing features
- [ ] Quiz creation interface
- [ ] API for external integrations

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **MDBootstrap** for the UI framework
- **Bootstrap Icons** for the icon library
- **Google Fonts** for the Poppins font
- **AOS** for scroll animations
- **DevOps Community** for inspiration and feedback

## 📞 Support

For questions, issues, or contributions:
- Create an issue on GitHub
- Fork the repository and submit a pull request
- Contact the maintainer for direct support

---

**Made with ❤️ for the DevOps community**

*InfraQuiz - Empowering DevOps professionals through interactive learning*
