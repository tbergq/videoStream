/* eslint-disable no-underscore-dangle */
import get from 'lodash/get';

const initalState = get(window, '__PRELOADED_STATE__.moviePlayer', {});

export default function moviePlayerReducer(state = initalState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
