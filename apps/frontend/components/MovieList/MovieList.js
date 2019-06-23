// @flow

import React from 'react';
import { ListGroup } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled, { createGlobalStyle } from 'styled-components';

import MovieListItem from './MovieListItem';
import FilterInput from './FilterInput';
import { withMoviesContext } from '../../context/MoviesContext';

// TODO: Find a way to do this without global styling
const GlobalStyle = createGlobalStyle`
  .MovieList {
    .fade-enter {
      opacity: 0.01;
    }
    .fade-enter-active {
      opacity: 1;
      transition: opacity 500ms ease-in;
    }
    .fade-exit {
      opacity: 1;
    }
    .fade-exit-active {
      opacity: 0.01;
      transition: opacity 500ms ease-in;
    }
  }
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: flex-start;
`;
const FilterItem = styled.div`
  width: 50%;
`;

type Props = {|
  +movies: $ReadOnlyArray<{|
    +name: string,
    +fullPath: string,
  |}>,
|};

type State = {|
  +filter: string,
|};

class MovieList extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      filter: '',
    };
  }

  getMovies = () =>
    this.state.filter === ''
      ? this.props.movies
      : this.props.movies.filter(movie =>
          movie.name.toLowerCase().includes(this.state.filter.toLowerCase()),
        );

  onChange = e => {
    this.setState({ filter: e.target.value });
  };

  clear = () => this.setState({ filter: '' });

  render() {
    const movies = this.getMovies() || [];

    return (
      <React.Fragment>
        <GlobalStyle />
        <FlexContainer>
          <FilterItem>
            <FilterInput
              value={this.state.filter}
              onChange={this.onChange}
              clear={this.clear}
            />
          </FilterItem>
        </FlexContainer>
        <ListGroup as="div" className="MovieList">
          <TransitionGroup>
            {movies.map(movie => (
              <CSSTransition
                key={movie.fullPath}
                timeout={250}
                classNames="fade"
              >
                <MovieListItem movie={movie} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </React.Fragment>
    );
  }
}

const select = state => ({
  movies: state.movies,
});
export default withMoviesContext(select)(MovieList);
