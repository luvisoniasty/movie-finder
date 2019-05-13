import { FETCH_GENRES, FETCH_MOVIES, FETCH_MOVIE_DETAILS, FETCH_MOVIES_BY_TITLE } from '../actions/types';

const initialState = {
    genreItems: [],
    movieItems: [],
    movieItem: {
        details: {},
        similar: []
    }
};

export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_GENRES:
            return {
                ...state,
                genreItems: action.payload
            }
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