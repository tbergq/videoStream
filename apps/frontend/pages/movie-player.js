// @flow

import React from 'react';
import { render } from 'react-dom';

import Layout from '../components/Layout';
import MoviePlayerContainer from '../containers/MoviePlayerContainer';
import MoviePlayerContext from '../context/MoviePlayerContext';
import ChromeCastContext from '../context/ChromeCastContext';

const MoviePlayer = () => (
  <MoviePlayerContext.Provider>
    <ChromeCastContext.Provider>
      <Layout>
        <MoviePlayerContainer />
      </Layout>
    </ChromeCastContext.Provider>
  </MoviePlayerContext.Provider>
);
const root = document.getElementById('root');
if (root) {
  render(<MoviePlayer />, root);
}
