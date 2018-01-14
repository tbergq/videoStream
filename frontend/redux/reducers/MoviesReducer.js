import { FETCHED_MOVIES } from '../actions/MoviesActions';

const initalState = {
  movies: [],
};

export default function moviesReducer(state = initalState, action) {
  switch (action.type) {
    case FETCHED_MOVIES:
      return { ...state, movies: action.movies };
    default:
      return state;
  }
}
