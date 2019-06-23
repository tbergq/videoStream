// @flow

import * as React from 'react';

import { withMoviePlayerContext } from '../../context/MoviePlayerContext';

const SPACE_KEY = 32;

type Props = {|
  +moviePath: string,
  +subtitleUrl: string,
  +deactivateSpaceListener: string,
|};

type State = {|
  +isPlaying: boolean,
|};
class MoviePlayer extends React.Component<Props, State> {
  video: React.ElementRef<'video'>;
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

  setRef = (video: ?React.ElementRef<'video'>) => {
    if (video != null) {
      this.video = video;
    }
  };

  render() {
    const { moviePath, subtitleUrl } = this.props;

    return (
      <div>
        <div>
          <video controls ref={this.setRef}>
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

const select = ({ moviePath, subtitleUrl }) => ({
  moviePath,
  subtitleUrl,
});

export default withMoviePlayerContext(select)(MoviePlayer);
