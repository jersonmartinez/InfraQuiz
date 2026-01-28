# Deployment Guide - InfraQuiz

## GitHub Pages Deployment

This repository is configured to automatically deploy to GitHub Pages from the `site/dist/` directory.

### How It Works

1. **Automatic Deployment**: Every push to the `main` branch triggers the deployment workflow
2. **Build Process**: The GitHub Actions workflow builds the Vite application
3. **Static Files**: The built files from `site/dist/` are deployed to GitHub Pages
4. **Live Site**: The site is available at `https://jersonmartinez.github.io/InfraQuiz/`

### Workflow Steps

The deployment pipeline (`.github/workflows/deploy.yml`) is split into three phases:

1. **Quality Assurance (Parallel)**:
   - **Lint Code**: Ensures code style and best practices.
   - **Run Unit Tests**: Executes Vitest for core utilities (e.g., `quizParser`).
   - **Validate Quiz Content**: Runs a custom validator on all Markdown files in `quizzes/`.
   - **Security Audit**: Scans dependencies for high-security vulnerabilities.
2. **Build Phase**:
   - Installs dependencies and builds the Vite application.
   - Packages the `dist/` and `quizzes/` directories into a deployment artifact.
3. **Deployment Phase** (Main branch only):
   - Deploys the generated artifact to GitHub Pages.

### Manual Deployment

You can also trigger a manual deployment:

1. Go to the repository's "Actions" tab
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow" and select the `main` branch

### Local Build

To build the application locally:

```bash
cd site
npm install
npm run build
```

The built files will be in the `site/dist/` directory.

### Configuration

**Base Path**: The application is configured with `base: '/InfraQuiz/'` in `site/vite.config.js` to work correctly on GitHub Pages.

**Dependencies**: All dependencies are managed via `npm` and defined in `site/package.json`.

### Troubleshooting

If the deployment fails:

1. Check the GitHub Actions logs in the "Actions" tab
2. Ensure all dependencies are correctly specified in `package.json`
3. Verify that the build command (`npm run build`) works locally
4. Check that the `dist/` directory is generated correctly

### Development

For local development with hot reload:

```bash
cd site
npm install
npm run dev
```

This will start a development server at `http://localhost:5173`.
