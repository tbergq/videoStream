import { combineReducers } from 'redux';
import moviesReducer from './MoviesReducer';
import moviePlayerReducer from './MoviePlayerReducer';
import chromeCastReducer from './ChromeCastReducer';
import subtitleSearchReducer from './SubtitleSearchReducer';

const reducers = combineReducers({
  movies: moviesReducer,
  moviePlayer: moviePlayerReducer,
  chromeCast: chromeCastReducer,
  subtitleSearch: subtitleSearchReducer,
});

export default reducers;

export const getMovies = ({ movies }) => movies;
export const getMoviePlayer = ({ moviePlayer }) => moviePlayer;
export const getChromeCastReducer = ({ chromeCast }) => chromeCast;
export const getSubtitleSearch = ({ subtitleSearch }) => subtitleSearch;
