import style from "./MoviesPage.module.css";

import { useState, useEffect, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "react-router-dom";

import { fetchMoviesByQuery } from "../../services/api";
import MovieList from "../MovieList/MovieList";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [searchValue, setSearchValue] = useState(query);

  const handleSearch = (event) => {
    event.preventDefault();
    if (!searchValue.trim()) {
      toast.error("Please fill in the search field");
      return;
    }
    setSearchParams({ query: searchValue });
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

  useEffect(() => {
    if (query) {
      fetchMovies(query); // Викликаємо fetchMovies при зміні параметрів пошуку
    }
  }, [query, fetchMovies]);

  return (
    <div>
      <form onSubmit={handleSearch} className={style.form}>
        <input
          type="text"
          value={searchValue}
          placeholder="Search..."
          onChange={(e) => setSearchValue(e.target.value)}
          className={style.input}
        />
        <button type="submit" className={style.btn}>
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
