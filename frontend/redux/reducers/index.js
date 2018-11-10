import { combineReducers } from 'redux';
import chromeCastReducer from './ChromeCastReducer';

const reducers = combineReducers({
  chromeCast: chromeCastReducer,
});

export default reducers;

export const getChromeCastReducer = ({ chromeCast }) => chromeCast;
