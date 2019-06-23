// @flow

import React from 'react';
import { render } from 'react-dom';

import Layout from '../components/Layout';
import MoviesContainer from '../containers/MoviesContainer';
import MoviesContext from '../context/MoviesContext';

const Movies = () => (
  <MoviesContext.Provider>
    <Layout>
      <MoviesContainer />
    </Layout>
  </MoviesContext.Provider>
);

const root = document.getElementById('root');
if (root) {
  render(<Movies />, root);
}
