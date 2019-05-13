import { FILTER_YEARS, FILTER_RATING, FILTER_QUERY } from '../actions/types';

const initialState = {
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
        case FILTER_QUERY:
            return {
                ...state,
                query: action.payload
            }
        default: 
            return state;
    }
}