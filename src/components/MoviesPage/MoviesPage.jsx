import style from "./MoviesPage.module.css";

import { useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { fetchMoviesByQuery } from "../../services/api";
import MovieList from "../MovieList/MovieList";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!query.trim()) {
      toast.error("Please fill in the search field");
      return;
    }
    setMovies([]); // Очистити попередні результати пошуку
    fetchMovies(query); // Викликаємо fetchMovies з новим запитом
  };

  const fetchMovies = useCallback(async (query) => {
    try {
      setError(false);
      setLoading(true);
      const data = await fetchMoviesByQuery(query);
      setMovies(data); // Зберігаємо результати пошуку
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div>
      <form onSubmit={handleSearch} className={style.form}>
        <input
          type="text"
          value={query}
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
          className={style.input}
        />
        <button type="submit" className={style.btn}>
          {" "}
          Search
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Failed to load movies. Please try again later.</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
      <ToastContainer />
    </div>
  );
};

export default MoviesPage;
