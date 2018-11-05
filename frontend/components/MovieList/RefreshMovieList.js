import React from 'react';
import PropTypes from 'prop-types';
import { MdRefresh } from 'react-icons/md';

import FabButton from '../Buttons/FabButton';
import MoviesContext from '../../context/MoviesContext';

const RefreshMovieList = ({ fetchMovies }) => (
  <FabButton variant="primary" onClick={fetchMovies} title="Refresh movies">
    <MdRefresh />
  </FabButton>
);

RefreshMovieList.propTypes = {
  fetchMovies: PropTypes.func.isRequired,
};

const WithContext = () => (
  <MoviesContext.Consumer>{RefreshMovieList}</MoviesContext.Consumer>
);

export default WithContext;
