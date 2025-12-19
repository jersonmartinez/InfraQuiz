# Deployment Guide - InfraQuiz

## GitHub Pages Deployment

This repository is configured to automatically deploy to GitHub Pages from the `site/dist/` directory.

### How It Works

1. **Automatic Deployment**: Every push to the `main` branch triggers the deployment workflow
2. **Build Process**: The GitHub Actions workflow builds the Vite application
3. **Static Files**: The built files from `site/dist/` are deployed to GitHub Pages
4. **Live Site**: The site is available at `https://jersonmartinez.github.io/InfraQuiz/`

### Workflow Steps

The deployment workflow (`.github/workflows/deploy.yml`) performs the following steps:

1. **Checkout**: Clones the repository
2. **Setup Node.js**: Installs Node.js 18 with npm caching
3. **Install Dependencies**: Runs `npm ci` in the `site/` directory
4. **Build Application**: Runs `npm run build` to create production build
5. **Upload Artifact**: Packages the `site/dist/` directory
6. **Deploy**: Deploys the artifact to GitHub Pages

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
