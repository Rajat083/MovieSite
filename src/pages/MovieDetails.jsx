import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../css/MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        // Use the same API key as your existing API service
        const API_KEY = "4131f59d558389b616aa2aa91f8bfb83";
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
        const movieData = await response.json();
        setMovie(movieData);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieDetails();
    }
  }, [id]);

  if (loading) {
    return <div className="loading">Loading movie details...</div>;
  }

  if (!movie) {
    return <div className="error">Movie not found</div>;
  }

  return (
    <div className="movie-details">
        <div className="back">
            <Link to="/">
                <button>⬅ Back</button>
            </Link>
        </div>
      <div className="movie-details-content">
        <div className="movie-poster-large">
          <img 
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
            alt={movie.title} 
          />
        </div>
        <div className="movie-info-detailed">
          <h1>{movie.title}</h1>
          <p className="release-date">Release Date: {movie.release_date}</p>
          <p className="rating">Rating: {(movie.vote_average.toFixed(1))}/10</p>
          <p className="overview">{movie.overview}</p>
          <div className="genres">
            {movie.genres && movie.genres.map(genre => (
              <span key={genre.id} className="genre-tag">{genre.name}</span>
            ))}
          </div>
          <div className="watch-now">
            <Link to={`/watch/${movie.id}`}>
              <button className="watch-now-btn">▶ Watch Now</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MovieDetails