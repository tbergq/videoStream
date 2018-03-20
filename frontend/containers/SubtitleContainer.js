import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FabButton from '../components/Buttons/FabButton';
import withModal from '../components/withModal';
import SubtitleModal from '../components/SubtitleModal/SubtitleModal';
import {
  fetchSubtitleSuggestions,
  downloadSubtitle,
} from '../redux/actions/SubtitleSearchActions';
import { getSubtitleSearch, getMoviePlayer } from '../redux/reducers';
import SubtitleIcon from '../images/subtitles-white.png';

class SubtitleContainer extends React.Component {
  subtitleSelected = url => {
    this.props.downloadSubtitles(url, this.props.moviePath);
    this.props.toggleModal();
  };

  toggleModal = () => {
    this.props.toggleModal();
    this.props.onModalToggle();
  };

  render = () => {
    const {
      subtitleUrl,
      toggleModal,
      showModal,
      onModalToggle,
      ...rest
    } = this.props;

    if (subtitleUrl) {
      return null;
    }
    return (
      <div>
        <SubtitleModal
          {...rest}
          showModal={showModal}
          toggleModal={this.toggleModal}
          downloadSubtitles={this.subtitleSelected}
        />
        <FabButton onClick={this.toggleModal}>
          <img src={SubtitleIcon} alt="Subtitle" />
        </FabButton>
      </div>
    );
  };
}

SubtitleContainer.propTypes = {
  subtitleUrl: PropTypes.string.isRequired,
  toggleModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  downloadSubtitles: PropTypes.func.isRequired,
  moviePath: PropTypes.string.isRequired,
  onModalToggle: PropTypes.func.isRequired,
};

const select = state => ({
  ...getMoviePlayer(state),
  ...getSubtitleSearch(state),
});

const actions = dispatch => ({
  fetchSubtitleSuggestions: query => dispatch(fetchSubtitleSuggestions(query)),
  downloadSubtitles: (url, moviePath) =>
    dispatch(downloadSubtitle(url, moviePath)),
});

export default connect(select, actions)(withModal(SubtitleContainer));
