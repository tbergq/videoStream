import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getMovies } from '../redux/reducers';
import { fetchMovies } from '../redux/actions/MoviesActions';
import MovieList from '../components/MovieList/MovieList';

class MoviesContainer extends React.Component {
  componentWillMount() {
    this.props.dispatch(fetchMovies());
  }

  render() {
    return <MovieList movies={this.props.movies} />;
  }
}

MoviesContainer.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...getMovies(state),
});

export default connect(mapStateToProps)(MoviesContainer);
