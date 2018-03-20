import React from 'react';
import { hydrate } from 'react-dom';

import Layout from '../components/Layout';
import MoviePlayerContainer from '../containers/MoviePlayerContainer';

const MoviePlayer = () => (
  <Layout>
    <MoviePlayerContainer />
  </Layout>
);

hydrate(<MoviePlayer />, document.getElementById('root'));
