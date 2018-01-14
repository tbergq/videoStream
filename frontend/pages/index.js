import React from 'react';
import ReactDOM from 'react-dom';

import Layout from '../components/Layout';
import MoviesContainer from '../containers/MoviesContainer';

const Movies = () => (
  <Layout>
    <MoviesContainer />
  </Layout>
);

ReactDOM.render(
  <Movies />,
  document.getElementById('root'),
);
