import React from 'react';
import PropTypes from 'prop-types';

import MovieList from '../components/MovieList/MovieList';
import RefreshMovieList from '../components/MovieList/RefreshMovieList';
import { withMoviesContext } from '../context/MoviesContext';

class MoviesContainer extends React.Component {
  static propTypes = {
    fetchMovies: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.fetchMovies();
  }

  render() {
    return (
      <React.Fragment>
        <RefreshMovieList />
        <MovieList />
      </React.Fragment>
    );
  }
}

const select = state => ({
  fetchMovies: state.fetchMovies,
});

export default withMoviesContext(select)(MoviesContainer);
