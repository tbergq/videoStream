import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import withContext from './withContext';

const noop = () => {};
const serverAddress = get(
  window,
  '__PRELOADED_STATE__.moviePlayer.serverAddress',
  '',
);
const initalState = {
  session: null,
  castContext: null,
  mediaInfo: null,
  player: null,
  playerController: null,
  isCasting: false,
  setCastContext: noop,
  startCast: noop,
  castingStopped: noop,
  setUpCastSession: noop,
};

const { Provider: ContextProvider, Consumer } = React.createContext(
  initalState,
);

const setUpSubtitles = subtitleUrl => {
  const textTrackStyle = new chrome.cast.media.TextTrackStyle();
  textTrackStyle.fontScale = 2.0;
  const subtitle = new chrome.cast.media.Track(
    1, // track ID
    chrome.cast.media.TrackType.TEXT,
  );
  subtitle.trackContentId = `http://${serverAddress}/api/movies/stream/${subtitleUrl}`;
  subtitle.trackContentType = 'text/vtt';
  subtitle.subtype = chrome.cast.media.TextTrackType.SUBTITLES;
  subtitle.name = 'Spanish Subtitles';
  subtitle.language = 'es-PE';
  subtitle.customData = null;
  return subtitle;
};

const setupMediaInfo = mediaUrl => {
  const contentType = 'video/mp4';
  const mediaInfo = new chrome.cast.media.MediaInfo(mediaUrl, contentType);
  mediaInfo.contentType = contentType;
  mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();
  mediaInfo.customData = null;
  mediaInfo.streamType = chrome.cast.media.StreamType.BUFFERED;

  mediaInfo.tracks = [];
  return mediaInfo;
};

class Provider extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      ...initalState,
      setCastContext: this.setCastContext,
      startCast: this.startCast,
      castingStopped: this.castingStopped,
      setUpCastSession: this.setUpCastSession,
    };
  }

  setCastContext = castContext => this.setState({ castContext });

  startCast = async (mediaUrl, subtitleUrl, session) => {
    const mediaInfo = setupMediaInfo(
      `http://${serverAddress}/api/movies/stream/${mediaUrl}`,
    );
    const request = new chrome.cast.media.LoadRequest(mediaInfo);

    if (subtitleUrl) {
      const sub = setUpSubtitles(subtitleUrl);
      mediaInfo.tracks.push(sub);
      request.activeTrackIds = [1];
    }

    try {
      await session.loadMedia(request);
      const player = new cast.framework.RemotePlayer();
      const playerController = new cast.framework.RemotePlayerController(
        player,
      );
      this.setState({
        mediaInfo,
        player,
        playerController,
        isCasting: true,
      });
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
    }
  };

  castingStopped = () => this.setState({ isCasting: false });

  setUpCastSession = () => {
    const session = cast.framework.CastContext.getInstance().getCurrentSession();
    this.setState({ session });
  };

  render() {
    return (
      <ContextProvider value={this.state}>
        {this.props.children}
      </ContextProvider>
    );
  }
}

export const withChromeCastContext = select => withContext(select, Consumer);

export default { Provider, Consumer };
