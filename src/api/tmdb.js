import axios from 'axios';

const tmdbInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
});

export const getGenres = (language) => 
    tmdbInstance.get(`genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${language}`);

export const getMovies = (page, minRating, maxRating, minYear, maxYear, withoutGenres, language) => 
    tmdbInstance.get(`discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${language}
&sort_by=popularity.desc&vote_average.gte=${minRating}&vote_average.lte=${maxRating}&primary_release_date.gte=${minYear}
&primary_release_date.lte=${maxYear}&without_genres=${withoutGenres}&include_adult=false&include_video=false&page=${page}`);

export const getMovieDetails = (id, language) => 
    tmdbInstance.get(`movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${language}`);

export const getSimilarMovies = (id, language) =>
    tmdbInstance.get(`movie/${id}/similar?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=${language}`);

export const getMoviesByTitle = (query, page) =>
    tmdbInstance.get(`search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}&page=${page}`);