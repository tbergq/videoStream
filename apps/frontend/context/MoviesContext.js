// @flow

import * as React from 'react';

import Http from '../utils/Http';
import withContext from './withContext';

const defaultState = {
  movies: [],
  fetchMovies: () => Promise.resolve(),
  deleteMovie: () => Promise.resolve(),
};

const { Provider: ContextProvider, Consumer } = React.createContext<State>(
  defaultState,
);

type Props = {|
  +children: React.Node,
|};

type State = {|
  +movies: $ReadOnlyArray<{
    +fullPath: string,
    ...
  }>,
  +fetchMovies: () => Promise<void>,
  +deleteMovie: string => Promise<void>,
|};

class Provider extends React.Component<Props, State> {
  constructor(props: Props) {
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

  deleteMovie = async (moviePath: string) => {
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

export const withMoviesContext = (select: Function) =>
  withContext(select, Consumer);

export default { Provider, Consumer };
