import { combineReducers } from 'redux';
import moviesReducer from './MoviesReducer';
import moviePlayerReducer from './MoviePlayerReducer';

const reducers = combineReducers({
  movies: moviesReducer,
  moviePlayer: moviePlayerReducer,
});

export default reducers;

export const getMovies = ({ movies }) => movies;
export const getMoviePlayer = ({ moviePlayer }) => moviePlayer;
