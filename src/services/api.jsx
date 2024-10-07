import axios from "axios";

const API_KEY = "e1f6ca404bb17780b989410999b385df";
const BASE_URL = "https://api.themoviedb.org/3";

const fetchTrendingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/day`, {
    params: { api_key: API_KEY },
  });
  return response.data.results;
};

const fetchMoviesByQuery = async (query) => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: { api_key: API_KEY, query },
  });
  return response.data.results;
};

const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
    params: { api_key: API_KEY },
  });
  return response.data;
};

const fetchMovieCredits = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
    params: { api_key: API_KEY },
  });
  return response.data;
};

const fetchMovieReviews = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
    params: { api_key: API_KEY },
  });
  return response.data;
};

export {
  fetchTrendingMovies,
  fetchMoviesByQuery,
  fetchMovieDetails,
  fetchMovieCredits,
  fetchMovieReviews,
};
