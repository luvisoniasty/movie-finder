import { FETCH_MOVIES, FETCH_MOVIE_DETAILS, FETCH_MOVIES_BY_TITLE } from '../actions/types';

const initialState = {
    movieItems: {
        type: 'all',
        page: 1,
        pages: 1,
        movies: []
    },
    movieItem: {
        details: {},
        similar: []
    }
};

export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_MOVIES:
            return {
                ...state,
                movieItems: action.payload
            }
        case FETCH_MOVIE_DETAILS:
            return {
                ...state,
                movieItem: action.payload
            }
        case FETCH_MOVIES_BY_TITLE:
            return {
                ...state,
                movieItems: action.payload
            }
        default: 
            return state;
    }
}