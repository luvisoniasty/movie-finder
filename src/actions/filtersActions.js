import { FETCH_GENRES, FILTER_YEARS, FILTER_RATING, TOGGLE_GENRE, CHECK_ALL_GENRES, UNCHECK_ALL_GENRES, FILTER_QUERY } from '../actions/types';
import * as tmdb from '../api/tmdb';

export const fetchGenres = (language = 'en-US') => dispatch => {
    tmdb.getGenres(language).then(res => 
        dispatch({
            type: FETCH_GENRES,
            payload: res.data.genres.map( genre => {
                return {...genre, checked: true };
            })
        })
    );
};

export const filterYears = (years) => dispatch => {
    dispatch({
        type: FILTER_YEARS,
        payload: years
    });
};

export const filterRating = (ratings) => dispatch => {
    dispatch({
        type: FILTER_RATING,
        payload: ratings
    });
};

export const toggleGenre = (id) => dispatch => {
    dispatch({
        type: TOGGLE_GENRE,
        payload: id
    })
}

export const checkAllGenres = () => dispatch => {
    dispatch({
        type: CHECK_ALL_GENRES
    })
}

export const uncheckAllGenres = () => dispatch => {
    dispatch({
        type: UNCHECK_ALL_GENRES
    })
}

export const filterQuery = (query) => dispatch => {
    dispatch({
        type: FILTER_QUERY,
        payload: query
    });
};