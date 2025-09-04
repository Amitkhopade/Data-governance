# Comply Nav Insight

A modern data governance and compliance navigation platform built with React, TypeScript, and FastAPI.

## Features

- 📊 Interactive Dashboard with KPI tracking
- 📂 Data Catalog and Lineage Visualization
- 📋 Policy Management Studio
- 🔍 Data Quality Monitoring
- 📈 Source Completeness Tracking
- 💻 SQL Query Interface
- 🤖 AI-powered Chat Assistant

## Technologies

- Frontend: React, TypeScript, Vite
- UI Components: Radix UI, Tailwind CSS
- Visualization: D3.js
- Backend: FastAPI, OpenRouter LLM
- Deployment: GitHub Pages

## Development

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Deployment

This project is configured to deploy to GitHub Pages automatically. You can view the live site at: [https://amitkhopade.github.io/comply-nav-insight-17/](https://amitkhopade.github.io/comply-nav-insight-17/)

### Automatic Deployment

1. Every push to the `main` branch triggers the deployment workflow
2. The workflow builds the project and deploys it to GitHub Pages

### Manual Deployment

To deploy manually:

1. Install dependencies:
```sh
npm install
```

2. Install gh-pages package:
```sh
npm install -D gh-pages
```

3. Build and deploy:
```sh
# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
```

### GitHub Pages Setup

1. Go to your repository settings on GitHub
2. Navigate to "Pages" under "Code and automation"
3. Under "Build and deployment":
   - Source: Deploy from a branch
   - Branch: gh-pages / (root)
4. Click Save

The dashboard will be accessible at the root URL: [https://amitkhopade.github.io/comply-nav-insight-17/](https://amitkhopade.github.io/comply-nav-insight-17/)

## Backend Setup

The backend requires additional configuration:

1. Install Python dependencies:
```sh
cd backend
pip install -r requirements.txt
```

2. Set up environment variables:
```sh
cp .env.example .env
# Edit .env with your OpenRouter API key
```

3. Run the backend:
```sh
uvicorn agent_backend:app --reload
```
