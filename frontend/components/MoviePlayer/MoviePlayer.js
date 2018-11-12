import React from 'react';
import PropTypes from 'prop-types';

import { withMoviePlayerContext } from '../../context/MoviePlayerContext';

const SPACE_KEY = 32;

class MoviePlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
    };
  }

  componentDidMount = () => {
    window.addEventListener('keypress', this.handleKeyPress);
  };

  componentWillUnmount = () => {
    window.removeEventListener('keypress', this.handleKeyPress);
  };

  handleKeyPress = event => {
    switch (event.keyCode) {
      case SPACE_KEY:
        this.startStopVideo();
        break;
      default:
        break;
    }
  };

  startStopVideo = () => {
    if (this.props.deactivateSpaceListener) {
      return;
    }

    if (this.state.isPlaying) {
      this.video.pause();
      this.setState({ isPlaying: false });
    } else {
      this.video.play();
      this.setState({ isPlaying: true });
    }
  };

  render() {
    const { moviePath, subtitleUrl } = this.props;

    return (
      <div>
        <div>
          <video
            controls
            ref={video => {
              this.video = video;
            }}
          >
            <source src={`/api/movies/stream/${moviePath}`} type="video/mp4" />
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
      </div>
    );
  }
}

MoviePlayer.propTypes = {
  moviePath: PropTypes.string.isRequired,
  subtitleUrl: PropTypes.string.isRequired,
  deactivateSpaceListener: PropTypes.bool.isRequired,
};

const select = ({ moviePath, subtitleUrl }) => ({
  moviePath,
  subtitleUrl,
});

export default withMoviePlayerContext(select)(MoviePlayer);
