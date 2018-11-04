/* eslint-disable no-unused-expressions */
import React from 'react';
import { Navbar, NavbarBrand } from 'react-bootstrap';
import { injectGlobal } from 'styled-components';

injectGlobal`
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
    <NavbarBrand href="/">Tito bonito videoplayer</NavbarBrand>
  </Navbar>
);

export default Header;
