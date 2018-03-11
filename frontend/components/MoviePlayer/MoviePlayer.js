import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

const ButtonContainer = styled.div`
  margin-top: 10px;
`;

const back = () => {
  window.location.href = '/';
};

const MoviePlayer = ({ movieUrl, subtitleUrl }) => (
  <div>
    <div>
      <video controls>
        <source src={`/api/movies/stream/${movieUrl}`} type="video/mp4" />
        {subtitleUrl && (
          <track
            src={`/api/movies/stream/${subtitleUrl}`}
            srcLang="es"
            label="Spanish"
          />
        )}
        Your browser does not support the video tag.
      </video>
    </div>
    <ButtonContainer>
      <Button onClick={back}>Back</Button>
    </ButtonContainer>
  </div>
);

MoviePlayer.propTypes = {
  movieUrl: PropTypes.string.isRequired,
  subtitleUrl: PropTypes.string.isRequired,
};

export default MoviePlayer;
