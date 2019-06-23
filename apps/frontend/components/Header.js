// @flow

import React from 'react';
import { Navbar, NavbarBrand } from 'react-bootstrap';
import { createGlobalStyle } from 'styled-components';

const GlobalHeader = createGlobalStyle`
  .navbar {
    background-color: deeppink;
    border-color: deeppink;
      .navbar-brand {
        color: #fff;
        &:hover {
          color: pink;
        }
      }
  }
`;

const Header = () => (
  <Navbar>
    <GlobalHeader />
    <NavbarBrand href="/">Tito bonito videoplayer</NavbarBrand>
  </Navbar>
);

export default Header;
