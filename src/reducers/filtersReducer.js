import { FETCH_GENRES, FILTER_YEARS, FILTER_RATING, TOGGLE_GENRE, CHECK_ALL_GENRES, UNCHECK_ALL_GENRES,  FILTER_QUERY } from '../actions/types';

const initialState = {
    genreItems: [],
    year: {
        min: 2000, 
        max: new Date().getFullYear()
    },
    rating: {
        min: 7, 
        max: 10
    },
    query: ''
};

export default (state = initialState, action) => {
    switch(action.type) {
        case FETCH_GENRES:
            return {
                ...state,
                genreItems: action.payload
            }
        case FILTER_YEARS:
            return {
                ...state,
                year: action.payload
            }
        case FILTER_RATING:
            return {
                ...state,
                rating: action.payload
            }
        case TOGGLE_GENRE: 
            return {
                ...state,
                genreItems: action.payload
            }
        case CHECK_ALL_GENRES:
            return {
                ...state,
                genreItems: state.genreItems.map(genre => {
                    return {...genre, checked: true };
                })
            }
        case UNCHECK_ALL_GENRES:
            return {
                ...state,
                genreItems: state.genreItems.map(genre => {
                    return {...genre, checked: false };
                })
            }
        case FILTER_QUERY:
            return {
                ...state,
                query: action.payload
            }
        default: 
            return state;
    }
}