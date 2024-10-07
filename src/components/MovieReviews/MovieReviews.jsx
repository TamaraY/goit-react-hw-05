import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/api";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieReviews(movieId).then((data) => setReviews(data.results));
  }, [movieId]);

  return (
    <ul>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <li key={review.id}>
            <h4>{review.author}</h4>
            <p>{review.content}</p>
          </li>
        ))
      ) : (
        <p>No reviews found</p>
      )}
    </ul>
  );
};

export default MovieReviews;
