import React from 'react';
import { render } from 'react-dom';

import Layout from '../components/Layout';
import MoviePlayerContainer from '../containers/MoviePlayerContainer';

const MoviePlayer = () => (
  <Layout>
    <MoviePlayerContainer />
  </Layout>
);

render(<MoviePlayer />, document.getElementById('root'));
