// @flow

import * as React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { createGlobalStyle } from 'styled-components';
import 'bootstrap/dist/css/bootstrap.css';
import 'rc-slider/assets/index.css';

import Header from './Header';

const GlobalLayout = createGlobalStyle`
  .navbar {
    border-radius: 0;
    margin-bottom: 8px;
  }
`;

type Props = {|
  +children: React.Node,
|};

const Layout = ({ children }: Props) => (
  <div>
    <GlobalLayout />
    <Header />
    <Container>
      <Row>
        <Col xs={12}>{children}</Col>
      </Row>
    </Container>
  </div>
);

export default Layout;
