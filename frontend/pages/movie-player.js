import React from 'react';
import ReactDOM from 'react-dom';

import Layout from '../components/Layout';

const MoviePlayer = () => (
  <Layout>
    <div>Movie player</div>
  </Layout>
);

ReactDOM.render(
  <MoviePlayer />,
  document.getElementById('root'),
);
