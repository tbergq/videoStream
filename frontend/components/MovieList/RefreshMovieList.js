import React from 'react';
import { Glyphicon } from 'react-bootstrap';
import PropTypes from 'prop-types';

import FabButton from '../Buttons/FabButton';

const RefreshMovieList = ({ fetchMovies }) => (
  <FabButton bsStyle="primary" onClick={fetchMovies} title="Refresh movies">
    <Glyphicon glyph="refresh" />
  </FabButton>
);

RefreshMovieList.propTypes = {
  fetchMovies: PropTypes.func.isRequired,
};

export default RefreshMovieList;
