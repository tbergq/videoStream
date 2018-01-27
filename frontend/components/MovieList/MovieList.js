import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';

import MovieListItem from './MovieListItem';

const MovieList = ({ movies }) => (
  <ListGroup componentClass="ul">
    {movies.map(movie => (
      <MovieListItem
        key={movie.fullPath}
        movie={movie}
      />
    ))}
  </ListGroup>
);

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MovieList;
