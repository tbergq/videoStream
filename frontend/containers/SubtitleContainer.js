import React from 'react';
import PropTypes from 'prop-types';
import querystring from 'querystring';

import FabButton from '../components/Buttons/FabButton';
import withModal from '../components/withModal';
import SubtitleModal from '../components/SubtitleModal/SubtitleModal';
import SubtitleIcon from '../images/subtitles-white.png';
import { withMoviePlayerContext } from '../context/MoviePlayerContext';
import Http from '../utils/Http';

class SubtitleContainer extends React.Component {
  state = {
    subtitles: [],
  };

  subtitleSelected = url => {
    this.props.downloadSubtitle(url, this.props.moviePath);
    this.props.toggleModal();
  };

  toggleModal = () => {
    this.props.toggleModal();
    this.props.onModalToggle();
  };

  getSubtitleSuggestions = async query => {
    const response = await Http(
      `/api/subtitles?${querystring.stringify({ query })}`,
    );
    this.setState({ subtitles: response });
  };

  render() {
    const { subtitleUrl, showModal, movieName } = this.props;

    if (subtitleUrl) {
      return null;
    }
    return (
      <div>
        <SubtitleModal
          showModal={showModal}
          toggleModal={this.toggleModal}
          downloadSubtitles={this.subtitleSelected}
          fetchSubtitleSuggestions={this.getSubtitleSuggestions}
          subtitleSuggestions={this.state.subtitles}
          movieName={movieName}
        />
        <FabButton onClick={this.toggleModal}>
          <img src={SubtitleIcon} alt="Subtitle" />
        </FabButton>
      </div>
    );
  }
}

SubtitleContainer.propTypes = {
  subtitleUrl: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  downloadSubtitle: PropTypes.func.isRequired,
  moviePath: PropTypes.string.isRequired,
  onModalToggle: PropTypes.func.isRequired,
  movieName: PropTypes.string.isRequired,
};

const select = ({ downloadSubtitle, moviePath, subtitleUrl, movieName }) => ({
  downloadSubtitle,
  moviePath,
  subtitleUrl,
  movieName,
});

export default withMoviePlayerContext(select)(withModal(SubtitleContainer));
