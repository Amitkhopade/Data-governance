#!/bin/bash

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Build for GitHub Pages
echo "Building for GitHub Pages..."
npm run build:gh-pages

# Deploy to GitHub Pages
echo "Deploying to GitHub Pages..."
npm run deploy
