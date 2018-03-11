import React from 'react';
import ReactDOM from 'react-dom';

import Layout from '../components/Layout';
import MoviePlayerContainer from '../containers/MoviePlayerContainer';

const MoviePlayer = () => (
  <Layout>
    <MoviePlayerContainer />
  </Layout>
);

ReactDOM.render(<MoviePlayer />, document.getElementById('root'));
