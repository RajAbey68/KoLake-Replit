# Vercel Auto-Deployment Setup for Ko Lake Villa

## Current Status
Your Ko Lake Villa website repository: `https://github.com/RajAbey68/KoLake-Replit`
Existing Vercel deployment: Connected to correct GitHub repository

## Automatic Deployment Trigger Options

### Option 1: Vercel GitHub Integration (Recommended)
1. **Connect Repository in Vercel**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Find your `ko-lake-villa-website` project
   - Go to **Settings** → **Git**
   - Ensure GitHub repository is connected
   - **Production Branch**: `main`
   - **Auto-deploy**: Enable for `main` branch

2. **GitHub Webhook Setup**:
   - Vercel automatically creates webhooks when connected
   - Every push to `main` branch triggers deployment
   - Status updates appear in GitHub commits

### Option 2: Manual Trigger via GitHub Actions
Create `.github/workflows/deploy.yml` in your repository:

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [ main ]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### Option 3: Vercel CLI Trigger
```bash
# Install Vercel CLI
npm i -g vercel

# Login and deploy
vercel login
vercel --prod
```

## Current Vercel Project Settings Required

### Environment Variables (Add in Vercel Dashboard):
```env
SMTP_HOST=smtp.gmail.com
SMTP_USER=contact.kolac@gmail.com
SMTP_PASS=your-app-password
FROM_EMAIL=contact.kolac@gmail.com
TEAM_TO_EMAILS=contact.Kolac@gmail.com,RajAbey68@gmail.com,Amir.laurie@gmail.com
DATABASE_URL=your-database-url
```

### Build Settings:
- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

## Immediate Deployment Trigger

To trigger deployment right now:

1. **Push any change to GitHub main branch** (Vercel auto-deploys)
2. **Manual trigger in Vercel dashboard**: Go to Deployments → Redeploy
3. **GitHub webhook trigger**: Any commit to main branch

## Verify Auto-Deployment Working

After setup, test by:
1. Make small change to any file
2. Push to GitHub main branch
3. Check Vercel dashboard for automatic deployment
4. Verify live site updates at your domain

Your Ko Lake Villa website will automatically deploy to Vercel whenever code is pushed to the main branch of your GitHub repository.

---
**Repository**: https://github.com/RajAbey68/KoLake-Replit
**Live Site**: Connected to Vercel project