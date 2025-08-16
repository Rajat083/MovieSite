# Movie Site - React + Vite

A modern movie discovery and watching application built with React and Vite, powered by The Movie Database (TMDB) API.

## Features

- Browse popular movies
- Search for movies
- View detailed movie information
- Watch movie trailers
- Add movies to favorites (persisted in localStorage)
- Responsive design for mobile and desktop

## Setup Instructions

### 1. Clone the repository
```bash
git clone <repository-url>
cd moviesite
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration
1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Get your TMDB API key:
   - Go to [The Movie Database](https://www.themoviedb.org/)
   - Create an account or sign in
   - Go to Settings → API
   - Generate an API key

3. Update the `.env` file with your API key:
   ```
   VITE_TMDB_API_KEY=your_actual_api_key_here
   ```

### 4. Run the development server
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

## Technology Stack

- **React** - Frontend framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **TMDB API** - Movie data and trailers
- **CSS3** - Styling and responsive design

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── contexts/      # React context providers
├── services/      # API service functions
└── css/          # Styling files
```
