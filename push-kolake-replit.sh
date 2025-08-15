#!/usr/bin/env bash
set -euo pipefail

echo "🚀 Pushing Ko Lake Replit to GitHub using PAT authentication..."

# Configure git user
git config --global user.name "rajabey68"
git config --global user.email "rajabey68@users.noreply.github.com"

# Remove existing remote if any
git remote remove origin 2>/dev/null || echo "No existing origin to remove"

# Add remote with PAT authentication (the method that works reliably)
echo "Adding remote repository..."
git remote add origin "https://RajAbey68:${GITHUB_PERSONAL_ACCESS_TOKEN}@github.com/RajAbey68/KoLake-Replit.git"

# Verify remote
git remote -v

# Set main branch
git branch -M main

# Show what will be pushed
echo "Repository status:"
git status --short

# Stage all files including new CI/CD files
git add .

# Check if there are changes to commit
if ! git diff --staged --quiet; then
    echo "Committing Ko Lake Replit project..."
    git commit -m "feat: Ko Lake Replit v1.3 production release

- Complete Shadow Pages CMS with real-time editing
- Enterprise CI/CD pipeline with GitHub Actions  
- AI-powered admin console with GPT-5
- Security hardening and performance optimization
- Professional documentation and deployment guides
- Jest testing framework with comprehensive coverage
- Production-ready website with all features"
else
    echo "No new changes to commit"
fi

# Push to GitHub
echo "Pushing to clean repository..."
git push -u origin main

echo "✅ Successfully pushed Ko Lake Replit to GitHub!"
echo "🔗 Repository: https://github.com/RajAbey68/KoLake-Replit"
echo "📋 Next: Configure GitHub secrets for CI/CD activation"