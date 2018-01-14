import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Col, Row } from 'react-bootstrap';

import Header from './Header';

const Layout = ({ children }) => (
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
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
