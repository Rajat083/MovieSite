import "../css/MovieCard.css";
import { useMovieContext } from "../contexts/MovieContext";
import { Link } from "react-router-dom";

const MovieCard = ({movie}) => {
    const { isFavourite, addToFavourites, removeFromFavourites } = useMovieContext();

    const favourite = isFavourite(movie.id);

    const favouriteHandler = (e) => {
        e.preventDefault();
        if (favourite) removeFromFavourites(movie.id);
        else addToFavourites(movie);
    };

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <div className="movie-overlay">
                    <button
                     className={`favorite-btn ${favourite ? "active" : ""}`}
                     onClick={favouriteHandler}>
                        {favourite ? "❤️" : "🤍"}
                    </button>
                    <Link to={`/${movie.id}`}>
                        <button className="play-btn">▶</button>
                    </Link>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date.split("-")[0]}</p>
            </div>
        </div>
    );
}
export default MovieCard;