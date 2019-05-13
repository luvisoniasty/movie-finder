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

export const fetchMovies = (page = 1, minRating = 0, maxRating = 10, minYear = 1900, maxYear = 2100, language = 'en-US') => dispatch => {
    tmdb.getMovies(page, minRating, maxRating, minYear, maxYear, language).then(res => 
        dispatch({
            type: FETCH_MOVIES,
            payload: res.data.results
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

export const clearMovieDetails = () => dispatch => {
    dispatch({
        type: FETCH_MOVIE_DETAILS,
        payload: {
            details: {},
            similar: []
        }
    });
}

export const fetchMoviesByTitle = (query, page = 1) => dispatch => {
    tmdb.getMoviesByTitle(query, page).then(res => 
        dispatch({
            type: FETCH_MOVIES_BY_TITLE,
            payload: res.data.results
        })
    );
};

