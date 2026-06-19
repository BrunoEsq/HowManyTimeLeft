# Changes Made for Vercel Deployment

## Problem
The frontend was trying to connect to `http://localhost:8000` (Django backend) which doesn't exist in production on Vercel.

## Solution
Replaced the Django backend with Vercel Serverless Functions that proxy requests directly to the RAWG API.

## Files Created

1. **`api/games/search.ts`** - Serverless function for game search
   - Handles: `GET /api/games/search?search=<query>&page=<page>&page_size=<size>`
   - Proxies to RAWG API games search endpoint

2. **`api/games/[id].ts`** - Serverless function for game details
   - Handles: `GET /api/games/<id>`
   - Proxies to RAWG API game details endpoint

3. **`vercel.json`** - Vercel configuration
   - Configures API routes
   - Sets environment variables

4. **`.env`** - Local environment variables
   - Contains RAWG_API_KEY for local development

5. **`.env.example`** - Example environment file
   - Template for environment variables

6. **`DEPLOY.md`** - Deployment instructions
   - Step-by-step guide for deploying to Vercel

## Files Modified

1. **`src/services/api.ts`**
   - Changed: `API_BASE_URL` from `http://localhost:8000` to empty string
   - Now uses relative URLs which work both locally (with Vite proxy) and in production

2. **`.gitignore`**
   - Added `.env` to prevent committing sensitive API keys

3. **`package.json`**
   - Added `@vercel/node` as dev dependency for TypeScript types

## Next Steps

1. Commit and push these changes to GitHub
2. Follow instructions in `DEPLOY.md` to deploy to Vercel
3. Add `RAWG_API_KEY` environment variable in Vercel dashboard

## Testing

After deployment, test these URLs (replace with your Vercel URL):
- Search: `https://your-app.vercel.app/api/games/search?search=Elden+Ring`
- Details: `https://your-app.vercel.app/api/games/3498`
