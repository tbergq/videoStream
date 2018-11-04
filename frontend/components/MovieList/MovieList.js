import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled, { injectGlobal } from 'styled-components';

import MovieListItem from './MovieListItem';
import FilterInput from './FilterInput';

// TODO: Find a way to do this without global styling
injectGlobal`
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

class MovieList extends React.Component {
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
    const { deleteMovie } = this.props;
    const movies = this.getMovies() || [];

    return (
      <React.Fragment>
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
                <MovieListItem movie={movie} deleteMovie={deleteMovie} />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </React.Fragment>
    );
  }
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteMovie: PropTypes.func.isRequired,
};

export default MovieList;
