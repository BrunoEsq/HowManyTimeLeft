# Deployment Instructions for Vercel

## Prerequisites
- A Vercel account (https://vercel.com)
- Your RAWG API key

## Steps to Deploy

### 1. Push to GitHub
Make sure your code is pushed to a GitHub repository.

### 2. Import Project to Vercel
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Vercel will auto-detect it's a Vite project

### 3. Configure Environment Variables
Before deploying, add this environment variable in Vercel:

**Environment Variables:**
- `RAWG_API_KEY` = `1b18eeed59504542baada61eb336bc78`

To add it:
1. In Vercel project settings → Environment Variables
2. Add the variable name and value
3. Select all environments (Production, Preview, Development)

### 4. Deploy
Click "Deploy" and wait for the build to complete.

## How It Works

The project now uses Vercel Serverless Functions instead of Django:

- `/api/games/search` → searches games via RAWG API
- `/api/games/[id]` → gets game details by ID

These functions are located in the `api/` folder and will be automatically deployed as serverless endpoints.

## Local Development

To test locally:
```bash
npm run dev
```

The API functions will be available at:
- `http://localhost:5173/api/games/search?search=game_name`
- `http://localhost:5173/api/games/123`

## Troubleshooting

If the search doesn't work after deployment:

1. **Check Environment Variables**: Make sure `RAWG_API_KEY` is set in Vercel
2. **Check Console**: Open browser DevTools → Console tab for errors
3. **Check Vercel Logs**: Go to Vercel dashboard → Your project → Deployments → Click on latest → Functions tab

## API Endpoints

### Search Games
```
GET /api/games/search?search=<query>&page=<page>&page_size=<size>
```

### Get Game Details
```
GET /api/games/<game_id>
```
