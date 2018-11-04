import React from 'react';
import PropTypes from 'prop-types';
import { MdRefresh } from 'react-icons/md';

import FabButton from '../Buttons/FabButton';

const RefreshMovieList = ({ fetchMovies }) => (
  <FabButton variant="primary" onClick={fetchMovies} title="Refresh movies">
    <MdRefresh />
  </FabButton>
);

RefreshMovieList.propTypes = {
  fetchMovies: PropTypes.func.isRequired,
};

export default RefreshMovieList;
