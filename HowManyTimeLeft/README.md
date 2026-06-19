# How Many Time Left - Game Duration Finder

A modern web application to search for games and discover their estimated completion times.

## Features

- 🎮 Search thousands of games using the RAWG API
- ⏱️ View estimated game completion times
- 🎨 Beautiful animated UI with BackgroundPaths hero component
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🔒 Secure API key management (hidden from frontend)
- ⚡ Fast and modern tech stack

## Tech Stack

### Backend
- **Django 6.0** - Python web framework
- **Django CORS Headers** - Cross-origin resource sharing
- **Python Decouple** - Environment variable management
- **Requests** - HTTP library for API calls

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful component library
- **Framer Motion** - Animation library
- **TanStack Query** - Data fetching and caching
- **Axios** - HTTP client
- **Lucide React** - Icon library

## Project Structure

```
HowManyTimeLeft/
├── HowManyHours/              # Django app
│   ├── views.py               # API endpoints
│   ├── urls.py                # App routes
│   └── templates/             # Old vanilla JS template (legacy)
├── HowManyTimeLeft/           # Django project settings
│   ├── settings.py            # Configuration
│   ├── urls.py                # Main routes
│   └── frontend/              # React application
│       ├── src/
│       │   ├── components/    # React components
│       │   │   ├── ui/        # shadcn/ui components
│       │   │   ├── GameSearch.tsx
│       │   │   ├── GameCard.tsx
│       │   │   └── GameDetails.tsx
│       │   ├── services/      # API client
│       │   ├── types/         # TypeScript types
│       │   ├── lib/           # Utilities
│       │   ├── App.tsx        # Main app component
│       │   └── main.tsx       # Entry point
│       ├── package.json
│       └── vite.config.ts
├── .env                       # Environment variables (DO NOT COMMIT)
├── .env.example               # Template for environment variables
├── requirements.txt           # Python dependencies
└── manage.py                  # Django management script
```

## Setup Instructions

### Prerequisites
- Python 3.9+
- Node.js 18+
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd HowManyTimeLeft
```

### 2. Setup Backend (Django)

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env and add your RAWG_API_KEY
# Get free API key at: https://rawg.io/apidocs

# Run migrations
python manage.py migrate

# Start Django development server
python manage.py runserver
```

The Django API will be available at `http://localhost:8000`

### 3. Setup Frontend (React)

```bash
# Navigate to frontend directory
cd HowManyTimeLeft/frontend

# Install dependencies
npm install

# Start Vite development server
npm run dev
```

The React app will be available at `http://localhost:5173`

### 4. Open in Browser

Navigate to `http://localhost:5173` and start searching for games!

## API Endpoints

### Search Games
```
GET /api/games/search/?search=<query>&page=1&page_size=20
```

**Response:**
```json
{
  "count": 203,
  "next": "...",
  "previous": null,
  "results": [
    {
      "id": 123,
      "name": "Game Name",
      "background_image": "https://...",
      "rating": 4.5,
      "playtime": 45,
      "genres": [...],
      "platforms": [...]
    }
  ]
}
```

### Get Game Details
```
GET /api/games/<game_id>/
```

**Response:**
```json
{
  "id": 123,
  "name": "Game Name",
  "description_raw": "Full description...",
  "metacritic": 85,
  "playtime": 45,
  "developers": [...],
  "screenshots": [...],
  ...
}
```

## Environment Variables

Create a `.env` file in the root directory with:

```env
RAWG_API_KEY=your_rawg_api_key_here
SECRET_KEY=your_django_secret_key_here
DEBUG=True
```

**Security Note:** Never commit the `.env` file to git. It's already in `.gitignore`.

## Build for Production

### Frontend
```bash
cd frontend
npm run build
```

The optimized build will be in `frontend/dist/`

### Deploy
The application is configured for Vercel deployment with `vercel.json`.

## Features Walkthrough

1. **Hero Section**: Animated background with floating SVG paths
2. **Search Bar**: Type to search with 300ms debounce
3. **Game Grid**: Responsive grid showing game cards
4. **Game Cards**: Hover effects with rating, duration, and genres
5. **Game Details Modal**: Click any card to see full game information
6. **Duration Display**: Shows estimated playtime with clock icon

## Future Enhancements

- [ ] Integration with HowLongToBeat API for more accurate durations
- [ ] Caching layer in Django for faster responses
- [ ] Pagination for search results
- [ ] Filters by genre, platform, rating
- [ ] Favorites system with localStorage
- [ ] Dark/Light mode toggle
- [ ] Voice search (port from legacy implementation)
- [ ] User authentication and profiles

## Credits

- Game data provided by [RAWG API](https://rawg.io/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

## License

MIT
