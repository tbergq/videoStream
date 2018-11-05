import { combineReducers } from 'redux';
import moviePlayerReducer from './MoviePlayerReducer';
import chromeCastReducer from './ChromeCastReducer';
import subtitleSearchReducer from './SubtitleSearchReducer';

const reducers = combineReducers({
  moviePlayer: moviePlayerReducer,
  chromeCast: chromeCastReducer,
  subtitleSearch: subtitleSearchReducer,
});

export default reducers;

export const getMoviePlayer = ({ moviePlayer }) => moviePlayer;
export const getChromeCastReducer = ({ chromeCast }) => chromeCast;
export const getSubtitleSearch = ({ subtitleSearch }) => subtitleSearch;
