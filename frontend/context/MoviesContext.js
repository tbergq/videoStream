/* eslint-disable react/no-unused-state */
import React from 'react';
import PropTypes from 'prop-types';

import Http from '../utils/Http';

const defaultState = {
  movies: [],
  fetchMovies: () => {},
  deleteMovie: () => {},
};

const { Provider: ContextProvider, Consumer } = React.createContext(
  defaultState,
);

class Provider extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      ...defaultState,
      fetchMovies: this.fetchMovies,
      deleteMovie: this.deleteMovie,
    };
  }

  fetchMovies = async () => {
    const movies = await Http('/api/movies');
    this.setState({ movies });
  };

  deleteMovie = async moviePath => {
    await Http(`api/movies/${encodeURIComponent(moviePath)}`, {
      method: 'DELETE',
    });
    this.setState(({ movies }) => ({
      movies: movies.filter(movie => movie.fullPath !== moviePath),
    }));
  };

  render() {
    return (
      <ContextProvider value={this.state}>
        {this.props.children}
      </ContextProvider>
    );
  }
}

export default { Provider, Consumer };
