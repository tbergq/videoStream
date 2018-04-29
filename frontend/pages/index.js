import React from 'react';
import { render } from 'react-dom';

import Layout from '../components/Layout';
import MoviesContainer from '../containers/MoviesContainer';

const Movies = () => (
  <Layout>
    <MoviesContainer />
  </Layout>
);

render(<Movies />, document.getElementById('root'));
