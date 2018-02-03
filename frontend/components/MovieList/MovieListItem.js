import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, OverlayTrigger, Button, Glyphicon } from 'react-bootstrap';
import styled from 'styled-components';

import SubtitleImage from '../../images/subtitles.png';
import Confirm from '../Confirm';
import withModal from '../withModal';

const SubtitleContainer = styled.span`
  margin-left: 8px;
`;

const MovieListItemContainer = styled.div`
  display: flex;
`;

class MovieListItem extends React.Component {
  constructor(props) {
    super(props);


    this.renderTooltip = this.renderTooltip.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }

  deleteItem() {
    this.props.deleteMovie(this.props.movie.fullPath);
    this.props.toggleModal();
  }

  renderTooltip() {
    const { movie: { subtitleUrl, fullPath } } = this.props;

    if (subtitleUrl) {
      const tooltip = (
        <Tooltip id={`${fullPath}-sub-tooltip`}>
          With subtitles
        </Tooltip>
      );
      return (
        <SubtitleContainer>
          <OverlayTrigger placement="top" overlay={tooltip}>
            <img src={SubtitleImage} alt="Subitled" />
          </OverlayTrigger>
        </SubtitleContainer>
      );
    }
    return null;
  }

  render() {
    const { movie, toggleModal, showModal } = this.props;
    return (
      <MovieListItemContainer>
        <a
          style={{ flex: 1 }}
          className="list-group-item"
          key={movie.fullPath}
          href={`/movie-player?movie=${encodeURIComponent(movie.fullPath)}&subtitleUrl=${encodeURIComponent(movie.subtitleUrl)}`}
        >
          {movie.name}
          {this.renderTooltip()}
        </a>
        <Button bsStyle="danger" onClick={toggleModal}>
          <Glyphicon glyph="trash" />
        </Button>
        <Confirm
          show={showModal}
          close={toggleModal}
          title="Confirm delete"
          body={`Are you sure you want to delete ${movie.name}`}
          successCallback={this.deleteItem}
        />
      </MovieListItemContainer>
    );
  }
}

MovieListItem.propTypes = {
  movie: PropTypes.shape({
    fullPath: PropTypes.string.isRequired,
    subtitleUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  toggleModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  deleteMovie: PropTypes.func.isRequired,
};

export default withModal(MovieListItem);
