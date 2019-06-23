// @flow

import React from 'react';
import querystring from 'querystring';

import FabButton from '../components/Buttons/FabButton';
import withModal from '../components/withModal';
import SubtitleModal from '../components/SubtitleModal/SubtitleModal';
import SubtitleIcon from '../images/subtitles-white.png';
import { withMoviePlayerContext } from '../context/MoviePlayerContext';
import Http from '../utils/Http';

type Props = {|
  +subtitleUrl: string,
  +toggleModal: Function,
  +showModal: boolean,
  +downloadSubtitle: Function,
  +moviePath: string,
  +onModalToggle: Function,
  +movieName: string,
|};

type State = {|
  +subtitles: $ReadOnlyArray<{|
    +url: string,
    +name: string,
  |}>,
  +isLoading: boolean,
|};
class SubtitleContainer extends React.Component<Props, State> {
  state = {
    subtitles: [],
    isLoading: false,
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
    this.setState({ isLoading: true });
    const response = await Http(
      `/api/subtitles?${querystring.stringify({ query })}`,
    );
    this.setState({ subtitles: response, isLoading: false });
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
          isLoading={this.state.isLoading}
        />
        <FabButton onClick={this.toggleModal}>
          <img src={SubtitleIcon} alt="Subtitle" />
        </FabButton>
      </div>
    );
  }
}

const select = ({ downloadSubtitle, moviePath, subtitleUrl, movieName }) => ({
  downloadSubtitle,
  moviePath,
  subtitleUrl,
  movieName,
});

export default withMoviePlayerContext(select)(withModal(SubtitleContainer));
