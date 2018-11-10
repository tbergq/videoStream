import { combineReducers } from 'redux';
import chromeCastReducer from './ChromeCastReducer';
import subtitleSearchReducer from './SubtitleSearchReducer';

const reducers = combineReducers({
  chromeCast: chromeCastReducer,
  subtitleSearch: subtitleSearchReducer,
});

export default reducers;

export const getChromeCastReducer = ({ chromeCast }) => chromeCast;
export const getSubtitleSearch = ({ subtitleSearch }) => subtitleSearch;
