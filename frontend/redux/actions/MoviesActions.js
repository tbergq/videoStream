import Http from '../../utils/Http';

export const FETCHED_MOVIES = 'movies/FETCHED_MOVIES';
export const DELETED_MOVIE = 'movies/DELETED_MOVIE';

export const fetchMovies = () => async (dispatch) => {
  const movies = await Http('/api/movies');
  dispatch({
    type: FETCHED_MOVIES,
    movies,
  });
};

export const deleteMovie = moviePath => async (dispatch) => {
  await Http(`api/movies/${encodeURIComponent(moviePath)}`, {
    method: 'DELETE',
  });
  dispatch({
    type: DELETED_MOVIE,
    moviePath,
  });
};

