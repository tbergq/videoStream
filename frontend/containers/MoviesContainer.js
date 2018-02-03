import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getMovies } from '../redux/reducers';
import { fetchMovies, deleteMovie } from '../redux/actions/MoviesActions';
import MovieList from '../components/MovieList/MovieList';

class MoviesContainer extends React.Component {
  componentDidMount() {
    this.props.fetchMovies();
  }

  render() {
    return <MovieList movies={this.props.movies} deleteMovie={this.props.deleteMovie} />;
  }
}

MoviesContainer.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchMovies: PropTypes.func.isRequired,
  deleteMovie: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...getMovies(state),
});

const mapDispatchToProps = dispatch => ({
  fetchMovies: () => dispatch(fetchMovies()),
  deleteMovie: moviePath => dispatch(deleteMovie(moviePath)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MoviesContainer);
