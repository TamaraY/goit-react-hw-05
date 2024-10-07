import { useState } from "react";
import { fetchMoviesByQuery } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!query.trim()) {
      return;
    }

    setLoading(true); // Додаємо завантаження при новому запиті
    setError(false); // Скидаємо помилку
    setMovies([]); // Очищаємо попередні результати

    try {
      // Отримуємо фільми
      const data = await fetchMoviesByQuery(query);
      setMovies(data); // Зберігаємо
    } catch (error) {
      console.error("Failed to fetch movies:", error);
      setError(true); // Встановлюємо помилку, якщо запит не вдався
    } finally {
      setLoading(false); // Завантаження завершено
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Failed to load movies. Please try again later.</p>}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
