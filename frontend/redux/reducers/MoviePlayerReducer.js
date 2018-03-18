import get from 'lodash/get';

import { SUBITLE_URL_ADDED } from '../actions/MoviePlayerActions';

const initalState = get(window, '__PRELOADED_STATE__.moviePlayer', {});

export default function moviePlayerReducer(state = initalState, action) {
  switch (action.type) {
    case SUBITLE_URL_ADDED:
      return { ...state, subtitleUrl: action.subtitleUrl };
    default:
      return state;
  }
}
