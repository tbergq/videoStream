import React from 'react';
import { Button, Glyphicon } from 'react-bootstrap';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonContainer = styled.div`
  margin-bottom: 10px;
`;

const RefreshMovieList = ({ fetchMovies }) => (
  <ButtonContainer>
    <Button bsStyle="primary" onClick={fetchMovies}>
      <Glyphicon glyph="refresh" />
    </Button>
  </ButtonContainer>
);

RefreshMovieList.propTypes = {
  fetchMovies: PropTypes.func.isRequired,
};

export default RefreshMovieList;
