import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import Layout from '../components/Layout';
import MoviePlayerContainer from '../containers/MoviePlayerContainer';
import reducers from '../redux/reducers';

const store = createStore(reducers, applyMiddleware(thunk));

const MoviePlayer = () => (
  <Provider store={store}>
    <Layout>
      <MoviePlayerContainer />
    </Layout>
  </Provider>
);

render(<MoviePlayer />, document.getElementById('root'));
