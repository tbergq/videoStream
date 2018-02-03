/* eslint-disable no-unused-expressions */
import React from 'react';
import { Navbar } from 'react-bootstrap';
import { injectGlobal } from 'styled-components';

injectGlobal`
  .navbar-inverse {
    background-color: deeppink;
    border-color: deeppink;
      .navbar-brand {
        color: #fff;
      }
  }
`;

const Header = () => (
  <Navbar inverse>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">Tito bonito videoplayer</a>
      </Navbar.Brand>
    </Navbar.Header>
  </Navbar>
);

export default Header;
