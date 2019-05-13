import { FILTER_YEARS, FILTER_RATING, FILTER_QUERY } from '../actions/types';

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

export const filterQuery = (query) => dispatch => {
    dispatch({
        type: FILTER_QUERY,
        payload: query
    });
};