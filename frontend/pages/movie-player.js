import React from 'react';
import { hydrate } from 'react-dom';

import Layout from '../components/Layout';
import MoviePlayerContainer from '../containers/MoviePlayerContainer';
import SubtitleContainer from '../containers/SubtitleContainer';

const MoviePlayer = () => (
  <Layout>
    <MoviePlayerContainer />
    <SubtitleContainer />
  </Layout>
);

hydrate(<MoviePlayer />, document.getElementById('root'));
