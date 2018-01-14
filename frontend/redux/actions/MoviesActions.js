import Http from '../../utils/Http';

export const FETCHED_MOVIES = 'movies/FETCHED_MOVIES';

export const fetchMovies = () => async (dispatch) => {
  const movies = await Http('/api/movies');
  dispatch({
    type: FETCHED_MOVIES,
    movies,
  });
};

