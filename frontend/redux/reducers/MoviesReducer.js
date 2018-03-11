import { FETCHED_MOVIES, DELETED_MOVIE } from '../actions/MoviesActions';

const initalState = {
  movies: [],
};

export default function moviesReducer(state = initalState, action) {
  switch (action.type) {
    case FETCHED_MOVIES:
      return { ...state, movies: action.movies };
    case DELETED_MOVIE:
      return {
        movies: state.movies.filter(
          movie => movie.fullPath !== action.moviePath,
        ),
      };
    default:
      return state;
  }
}
