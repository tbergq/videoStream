import React from 'react';
import PropTypes from 'prop-types';

import MoviePlayer from '../components/MoviePlayer/MoviePlayer';
import ChromeCastContainer from '../containers/ChromeCastContainer';
import SubtitleContainer from '../containers/SubtitleContainer';
import { withMoviePlayerContext } from '../context/MoviePlayerContext';
import { withChromeCastContext } from '../context/ChromeCastContext';

class MoviePlayerContainer extends React.Component {
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

MoviePlayerContainer.propTypes = {
  isCasting: PropTypes.bool.isRequired,
  movieName: PropTypes.string.isRequired,
};

const select = state => ({
  isCasting: state.isCasting,
});

export default withMoviePlayerContext(({ movieName }) => ({
  movieName,
}))(withChromeCastContext(select)(MoviePlayerContainer));
