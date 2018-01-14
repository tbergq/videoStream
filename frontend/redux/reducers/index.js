import { combineReducers } from 'redux';
import moviesReducer from './MoviesReducer';

const reducers = combineReducers({
  movies: moviesReducer,
});

export default reducers;

export const getMovies = ({ movies }) => movies;
