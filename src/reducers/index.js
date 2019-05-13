import { combineReducers } from 'redux';
import movieReducer from './movieReducer';
import filtersReducer from './filtersReducer';

export default combineReducers({
    movies: movieReducer,
    filters: filtersReducer
});