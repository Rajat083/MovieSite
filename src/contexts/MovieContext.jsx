import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = (props) => {
    const [ favourites, setFavourites ] = useState([]);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        try {
            const storedFavs = localStorage.getItem("favourites");
            
            if (storedFavs) {
                const parsed = JSON.parse(storedFavs);
                setFavourites(parsed);
            }
        } catch (error) {
            console.error("Error loading favourites from localStorage:", error);
        } finally {
            setIsInitialized(true);
        }
    }, [])

    useEffect(() => {
        // Only save to localStorage after initial load
        if (isInitialized) {
            try {
                localStorage.setItem('favourites', JSON.stringify(favourites));
                console.log("Saved to localStorage:", favourites);
            } catch (error) {
                console.error("Error saving favourites to localStorage:", error);
            }
        }
    }, [favourites, isInitialized])

    const addToFavourites = (movie) => {
        console.log("Adding to favourites:", movie);
        setFavourites(prev => {
            const newFavs = [...prev, movie];
            console.log("New favourites array:", newFavs);
            return newFavs;
        });
    }
    const removeFromFavourites = (movieId) => {
        console.log("Removing from favourites:", movieId);
        setFavourites(prev => {
            const newFavs = prev.filter(movie => movie.id !== movieId);
            console.log("New favourites array after removal:", newFavs);
            return newFavs;
        });
    }
    const isFavourite = (movieId) => {
        const result = favourites.some(movie => movie.id === movieId);
        console.log(`Is ${movieId} favourite?`, result, "Current favourites:", favourites);
        return result;
    }

    const value = {
        favourites,
        addToFavourites,
        removeFromFavourites,
        isFavourite
    }

    return (
        <MovieContext.Provider value={value}>
            {props.children}
        </MovieContext.Provider>
    )
}
