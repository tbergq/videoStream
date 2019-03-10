/* eslint-disable no-unused-expressions */
import React from 'react';
import PropTypes from 'prop-types';
import { Container, Col, Row } from 'react-bootstrap';
import { injectGlobal } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-slider/assets/index.css';

import Header from './Header';

injectGlobal`
  .navbar {
    border-radius: 0;
    margin-bottom: 8px;
  }
`;

const Layout = ({ children }) => (
  <div>
    <Header />
    <Container>
      <Row>
        <Col xs={12}>{children}</Col>
      </Row>
    </Container>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
