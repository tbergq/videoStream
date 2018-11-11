import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, OverlayTrigger, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { MdDelete } from 'react-icons/md';

import SubtitleImage from '../../images/subtitles.png';
import Confirm from '../Confirm';
import withModal from '../withModal';
import { withMoviesContext } from '../../context/MoviesContext';

const SubtitleContainer = styled('span')([], {
  marginLeft: '8px',
});

const MovieListItemContainer = styled('div')([], {
  display: 'flex',
});

const StyledLink = styled('a')([], {
  flex: 1,
});

class MovieListItem extends React.Component {
  deleteItem = () => {
    this.props.deleteMovie(this.props.movie.fullPath);
    this.props.toggleModal();
  };

  renderTooltip = () => {
    const { movie: { subtitleUrl, fullPath } } = this.props;

    if (subtitleUrl) {
      const tooltip = (
        <Tooltip id={`${fullPath}-sub-tooltip`}>With subtitles</Tooltip>
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
  };

  render() {
    const { movie, toggleModal, showModal } = this.props;
    return (
      <MovieListItemContainer>
        <StyledLink
          className="list-group-item"
          key={movie.fullPath}
          href={`/movie-player?movie=${encodeURIComponent(
            movie.fullPath,
          )}&subtitleUrl=${encodeURIComponent(movie.subtitleUrl)}`}
        >
          {movie.name}
          {this.renderTooltip()}
        </StyledLink>
        <Button variant="danger" onClick={toggleModal}>
          <MdDelete />
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

const select = state => ({
  deleteMovie: state.deleteMovie,
});

export default withMoviesContext(select)(withModal(MovieListItem));
