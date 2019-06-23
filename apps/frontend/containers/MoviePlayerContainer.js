// @flow

import React from 'react';

import MoviePlayer from '../components/MoviePlayer/MoviePlayer';
import ChromeCastContainer from './ChromeCastContainer';
import SubtitleContainer from './SubtitleContainer';
import { withMoviePlayerContext } from '../context/MoviePlayerContext';
import { withChromeCastContext } from '../context/ChromeCastContext';

type Props = {|
  +isCasting: boolean,
  +movieName: string,
|};

type State = {|
  +isModalOpen: boolean,
|};

class MoviePlayerContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };
  }

  toggleIsModalOpen = () => {
    this.setState(state => ({ isModalOpen: !state.isModalOpen }));
  };

  render() {
    const { isCasting, movieName } = this.props;
    return (
      <div>
        <h3>{movieName}</h3>
        {!isCasting && (
          <MoviePlayer deactivateSpaceListener={this.state.isModalOpen} />
        )}
        <ChromeCastContainer />
        <SubtitleContainer onModalToggle={this.toggleIsModalOpen} />
      </div>
    );
  }
}

const select = state => ({
  isCasting: state.isCasting,
});

export default withMoviePlayerContext(({ movieName }) => ({
  movieName,
}))(withChromeCastContext(select)(MoviePlayerContainer));
