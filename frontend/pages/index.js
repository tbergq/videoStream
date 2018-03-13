import React from 'react';
import { hydrate } from 'react-dom';

import Layout from '../components/Layout';
import MoviesContainer from '../containers/MoviesContainer';

const Movies = () => (
  <Layout>
    <MoviesContainer />
  </Layout>
);

hydrate(<Movies />, document.getElementById('root'));
