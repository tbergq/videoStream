import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import styled from 'styled-components';

import SubtitleImage from '../../images/subtitles.png';

const SubtitleContainer = styled.span`
  margin-left: 8px;
`;

const MovieListItem = ({ movie }) => {
  const tooltip = (
    <Tooltip id={`${movie.fullPath}-sub-tooltip`}>
      With subtitles
    </Tooltip>
  );
  return (
    <a
      className="list-group-item"
      key={movie.fullPath}
      href={`/movie-player?movie=${encodeURIComponent(movie.fullPath)}&subtitleUrl=${encodeURIComponent(movie.subtitleUrl)}`}
    >
      {movie.name}
      {movie.subtitleUrl && (
        <SubtitleContainer>
          <OverlayTrigger placement="top" overlay={tooltip}>
            <img src={SubtitleImage} alt="Subitled" />
          </OverlayTrigger>
        </SubtitleContainer>
    )}
    </a>
  );
};

MovieListItem.propTypes = {
  movie: PropTypes.shape({
    fullPath: PropTypes.string.isRequired,
    subtitleUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieListItem;
