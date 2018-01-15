import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const MovieList = ({ movies }) => (
  <ListGroup>
    {movies.map(movie => (
      <ListGroupItem key={movie.fullPath} href={`/movie-player?movie=${encodeURIComponent(movie.fullPath)}`}>{movie.name}</ListGroupItem>
    ))}
  </ListGroup>
);

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MovieList;
