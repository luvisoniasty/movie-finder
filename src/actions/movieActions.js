import { FETCH_GENRES, FETCH_MOVIES, FETCH_MOVIE_DETAILS, FETCH_MOVIES_BY_TITLE } from './types';
import * as tmdb from '../api/tmdb';

export const fetchGenres = (language = 'en-US') => dispatch => {
    tmdb.getGenres(language).then(res => 
        dispatch({
            type: FETCH_GENRES,
            payload: res.data.genres
        })
    );
};

export const fetchMovies = (page = 1, type = 'all', minRating = 0, maxRating = 10, minYear = 1900, maxYear = new Date().getFullYear(), language = 'en-US') => dispatch => {
    tmdb.getMovies(page, minRating, maxRating, minYear, maxYear, language).then(res => 
        dispatch({
            type: FETCH_MOVIES,
            payload: {
                type: type,
                page: res.data.page,
                pages: res.data.total_pages,
                movies: res.data.results
            }
        })
    );
};

export const fetchMovieDetails = (id, language = 'en-US') => dispatch => {
    tmdb.getMovieDetails(id, language).then(detailsRes => 
        tmdb.getSimilarMovies(id, language).then(similarRes => 
            dispatch({
                type: FETCH_MOVIE_DETAILS,
                payload: { 
                    details: detailsRes.data,
                    similar: similarRes.data.results
                }
            })
        )
    );
};

export const fetchMoviesByTitle = (query, page = 1, type = 'byTitle') => dispatch => {
    tmdb.getMoviesByTitle(query, page).then(res => 
        dispatch({
            type: FETCH_MOVIES_BY_TITLE,
            payload: {
                type: type,
                page: res.data.page,
                pages: res.data.total_pages,
                movies: res.data.results
            }
        })
    );
};

