import { Suspense, useRef } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { fetchMovieDetails } from "../../services/api";
import { useHttp } from "../../hooks/useHttp";

import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const goBackRef = useRef(location.state?.from ?? "/movies");

  // Використання хука для отримання деталей фільму
  const [movie] = useHttp(fetchMovieDetails, movieId);

  if (!movie) return <h2>Loading...</h2>;

  return (
    <div className={styles.aboutFilm}>
      <div className={styles.filmInfo}>
        <div className={styles.imgFilm}>
          <Link to={goBackRef.current} className={styles.back}>
            Go back
          </Link>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className={styles.img}
          />
        </div>
        <div className={styles.about}>
          <h2 className={styles.title}>{movie.title}</h2>
          <p className={styles.text}>{movie.overview}</p>

          <p className={styles.title}>Release Date: </p>
          <p className={styles.text}>{movie.release_date}</p>

          <p className={styles.title}>Rating: </p>
          <p className={styles.text}>{movie.vote_average}</p>
        </div>
      </div>

      <div className={styles.moreInfo}>
        <NavLink to="cast">Cast</NavLink>
        <NavLink to="reviews">Reviews</NavLink>
      </div>
      <Suspense fallback={<h2>Loading additional content...</h2>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
