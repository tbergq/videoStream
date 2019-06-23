// @flow

import React from 'react';

import MovieList from '../components/MovieList/MovieList';
import RefreshMovieList from '../components/MovieList/RefreshMovieList';
import { withMoviesContext } from '../context/MoviesContext';

type Props = {|
  +fetchMovies: Function,
|};

class MoviesContainer extends React.Component<Props> {
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
