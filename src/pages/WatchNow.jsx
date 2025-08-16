import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../css/WatchNow.css';

const WatchNow = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        setLoading(true);
        const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
        
        // Fetch movie details
        const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
        const movieData = await movieResponse.json();
        setMovie(movieData);

        // Fetch movie videos (trailers)
        const videosResponse = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`);
        const videosData = await videosResponse.json();
        
        // Find the first trailer or teaser
        const trailerVideo = videosData.results.find(
          video => video.type === 'Trailer' && video.site === 'YouTube'
        ) || videosData.results.find(
          video => video.type === 'Teaser' && video.site === 'YouTube'
        ) || videosData.results[0]; // Fallback to first video
        
        setTrailer(trailerVideo);
        console.log('Found trailer:', trailerVideo);
        
      } catch (error) {
        console.error('Error fetching movie data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovieData();
    }
  }, [id]);

  if (loading) {
    return <div className="loading">Loading movie...</div>;
  }

  if (!movie) {
    return <div className="error">Movie not found</div>;
  }

  return (
    <div className="watch-now-page">
      <div className="watch-header">
        <Link to={`/${id}`} className="back-to-details">
          <button className="back-btn">⬅ Back to Details</button>
        </Link>
        <h1>Now Watching: {movie.title}</h1>
      </div>
      
      <div className="video-container">
        {trailer ? (
          <iframe 
            title={movie.title} 
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&rel=0`} 
            allowFullScreen
            className="video-player"
            allow="no-autoplay; encrypted-media"
          ></iframe>
        ) : (
          <div className="no-trailer">
            <div className="no-trailer-content">
              <h2>🎬 {movie?.title}</h2>
              <p>No trailer available for this movie</p>
              <div className="movie-poster-fallback">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`} 
                  alt={movie?.title} 
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="movie-info-sidebar">
        <div className="movie-poster-small">
          <img 
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} 
            alt={movie.title} 
          />
        </div>
        <div className="movie-details-small">
          <h3>{movie.title}</h3>
          <p><strong>Release:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average?.toFixed(1)}/10</p>
          <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
          <div className="genres-small">
            {movie.genres && movie.genres.map(genre => (
              <span key={genre.id} className="genre-tag-small">{genre.name}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchNow;
