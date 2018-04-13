import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getMovies } from '../redux/reducers';
import { fetchMovies, deleteMovie } from '../redux/actions/MoviesActions';
import MovieList from '../components/MovieList/MovieList';
import RefreshMovieList from '../components/MovieList/RefreshMovieList';

class MoviesContainer extends React.Component {
  componentDidMount() {
    this.props.fetchMovies();
  }

  render() {
    return (
      <React.Fragment>
        <RefreshMovieList fetchMovies={this.props.fetchMovies} />
        <MovieList
          movies={this.props.movies}
          deleteMovie={this.props.deleteMovie}
        />
      </React.Fragment>
    );
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
