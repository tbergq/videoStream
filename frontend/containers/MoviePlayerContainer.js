import React from 'react';
import PropTypes from 'prop-types';

import MoviePlayer from '../components/MoviePlayer/MoviePlayer';
import ChromeCastContainer from '../containers/ChromeCastContainer';
import SubtitleContainer from '../containers/SubtitleContainer';
import MoviePlayerContext from '../context/MoviePlayerContext';
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

  renderInner = ({ moviePath, subtitleUrl, movieName }) => {
    const { isCasting } = this.props;
    return (
      <div>
        <h3>{movieName}</h3>
        {!isCasting && (
          <MoviePlayer deactivateSpaceListener={this.state.isModalOpen} />
        )}
        <ChromeCastContainer movieUrl={moviePath} subtitleUrl={subtitleUrl} />
        <SubtitleContainer onModalToggle={this.toggleIsModalOpen} />
      </div>
    );
  };

  render() {
    return (
      <MoviePlayerContext.Consumer>
        {this.renderInner}
      </MoviePlayerContext.Consumer>
    );
  }
}

MoviePlayerContainer.propTypes = {
  isCasting: PropTypes.bool.isRequired,
};

const select = state => ({
  isCasting: state.isCasting,
});

export default withChromeCastContext(select)(MoviePlayerContainer);
