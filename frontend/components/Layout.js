/* eslint-disable no-unused-expressions */
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from 'react-bootstrap';
import { injectGlobal } from 'styled-components';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.css';

import Header from './Header';
import reducers from '../redux/reducers';


injectGlobal`
  .navbar {
    border-radius: 0;
  }
`;

const store = createStore(reducers, applyMiddleware(thunk));

const Layout = ({ children }) => (
  <Provider store={store}>
    <div>
      <Header />
      <Grid>
        <Row>
          <Col xs={12}>
            {children}
          </Col>
        </Row>
      </Grid>
    </div>
  </Provider>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
