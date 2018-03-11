import get from 'lodash/get';

export const GOT_CAST_SESSION = 'chromeCast/GOT_CAST_SESSION';
export const GOT_CAST_CONTEXT = 'chromeCast/GOT_CAST_CONTEXT';
export const CAST_STARTED = 'chromeCast/CAST_STARTED';
export const CAST_STOPPED = 'chromeCast/CAST_STOPPED';

const serverAddress = get(
  window,
  '__PRELOADED_STATE__.moviePlayer.serverAddress',
  '',
);

export const setUpCastSession = () => {
  const session = cast.framework.CastContext.getInstance().getCurrentSession();
  console.log('session is', session);
  return {
    type: GOT_CAST_SESSION,
    session,
  };
};

export const setCastContext = castContext => ({
  type: GOT_CAST_CONTEXT,
  castContext,
});

function setupMediaInfo(mediaUrl) {
  const mediaInfo = new chrome.cast.media.MediaInfo(mediaUrl, 'video/mp4');
  mediaInfo.contentType = 'video/mp4';
  mediaInfo.metadata = new chrome.cast.media.GenericMediaMetadata();
  mediaInfo.customData = null;
  mediaInfo.streamType = chrome.cast.media.StreamType.BUFFERED;

  mediaInfo.tracks = [];
  return mediaInfo;
}

function setUpSubtitles(subtitleUrl) {
  const textTrackStyle = new chrome.cast.media.TextTrackStyle();
  textTrackStyle.fontScale = 2.0;
  const sub = new chrome.cast.media.Track(
    1, // track ID
    chrome.cast.media.TrackType.TEXT,
  );
  sub.trackContentId = `http://${serverAddress}/api/movies/stream/${subtitleUrl}`;
  sub.trackContentType = 'text/vtt';
  sub.subtype = chrome.cast.media.TextTrackType.SUBTITLES;
  sub.name = 'Spanish Subtitles';
  sub.language = 'es-PE';
  sub.customData = null;
  return sub;
}

export const startCast = (mediaUrl, subtitleUrl, session) => async dispatch => {
  const mediaInfo = setupMediaInfo(
    `http://${serverAddress}/api/movies/stream/${mediaUrl}`,
  );
  console.log('mediaInfo', mediaInfo);
  const request = new chrome.cast.media.LoadRequest(mediaInfo);

  if (subtitleUrl) {
    const sub = setUpSubtitles(subtitleUrl);
    mediaInfo.tracks.push(sub);
    request.activeTrackIds = [1];
  }

  try {
    await session.loadMedia(request);
    const player = new cast.framework.RemotePlayer();
    const playerController = new cast.framework.RemotePlayerController(player);
    dispatch({
      type: CAST_STARTED,
      mediaInfo,
      player,
      playerController,
      isCasting: true,
    });
  } catch (err) {
    console.log('load mediafailed', err);
    console.error(err);
  }
};

export const castingStopped = () => ({
  type: CAST_STOPPED,
  isCasting: false,
});
