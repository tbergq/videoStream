import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';

import MovieListItem from './MovieListItem';

const MovieList = ({ movies, deleteMovie }) => (
  <ListGroup componentClass="div">
    {movies.map(movie => (
      <MovieListItem
        key={movie.fullPath}
        movie={movie}
        deleteMovie={deleteMovie}
      />
    ))}
  </ListGroup>
);

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteMovie: PropTypes.func.isRequired,
};

export default MovieList;
