// @flow

import React from 'react';
import { MdRefresh } from 'react-icons/md';

import FabButton from '../Buttons/FabButton';
import { withMoviesContext } from '../../context/MoviesContext';

type Props = {|
  +fetchMovies: Function,
|};
const RefreshMovieList = ({ fetchMovies }: Props) => (
  <FabButton variant="primary" onClick={fetchMovies} title="Refresh movies">
    <MdRefresh />
  </FabButton>
);

const select = state => ({
  fetchMovies: state.fetchMovies,
});

export default withMoviesContext(select)(RefreshMovieList);
