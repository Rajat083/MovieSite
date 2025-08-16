import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import "../css/Home.css";
import { searchMovies, getPopularMovies } from "../services/api"; // Assuming you have an API function to search movies

const Home = () => {
    const [ searchQuery, setSearchQuery ] = useState("");
    const [ movies, setMovies]  = useState([]);
    const [ error, setError ] = useState(null);
    const [loading, setLoading ] = useState(true);

    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularMovies = await getPopularMovies();
                setMovies(popularMovies);
            }
            catch (err) {
                setError("failed to load movies");
                console.log(err);
            }
            finally {
                setLoading(false)
            }
        }
        loadPopularMovies();
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        if (loading) return;

        setLoading(true);
        try {
            const results = await searchMovies(searchQuery);
            setMovies(results);
            setError(null);
        }
        catch (err) {
            setError("Failed to load movies");
            console.log(err);
        }
        finally {
            setLoading(false);
        }
        

    };

    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                type="text"
                placeholder="Search for Movies" 
                className="search-input"
                onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">
                    Search
                </button>

            </form>

            {error && <div className="error-message">{error}</div>}
            {loading ? 
            <div className="loading">Loading Movies</div> :
            <div className="movies-grid">
                {movies.map(movie => (
                    <MovieCard key={movie.id} movie={{...movie, url: `https://example.com/${movie.id}.jpg`}} />
                ))}
            </div>
            }
            
        </div>
    );
}
export default Home;