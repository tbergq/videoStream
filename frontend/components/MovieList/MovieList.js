import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { injectGlobal } from 'styled-components';

import MovieListItem from './MovieListItem';

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

const MovieList = ({ movies, deleteMovie }) => (
  <ListGroup componentClass="div" className="MovieList">
    <TransitionGroup>
      {movies.map(movie => (
        <CSSTransition key={movie.fullPath} timeout={500} classNames="fade">
          <MovieListItem movie={movie} deleteMovie={deleteMovie} />
        </CSSTransition>
      ))}
    </TransitionGroup>
  </ListGroup>
);

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteMovie: PropTypes.func.isRequired,
};

export default MovieList;
