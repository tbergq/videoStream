import React from 'react';
import PropTypes from 'prop-types';

import MovieList from '../components/MovieList/MovieList';
import RefreshMovieList from '../components/MovieList/RefreshMovieList';
import MovieContext from '../context/MoviesContext';

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

export default class MoviesContainerWithContext extends React.Component {
  renderInner = ({ fetchMovies }) => (
    <MoviesContainer fetchMovies={fetchMovies} />
  );

  render() {
    return <MovieContext.Consumer>{this.renderInner}</MovieContext.Consumer>;
  }
}
