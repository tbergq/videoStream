import querystring from 'querystring';

import Http from '../../utils/Http';
import { SUBITLE_URL_ADDED } from './MoviePlayerActions';

export const SUBTITLES_FETCHED = 'subtitleSearch/SUBTITLES_FETCHED';
export const IS_LOADING_CHANGED = 'subtitleSearch/IS_LOADING_CHANGED';
export const SUBTITLE_DOWNLOADED = 'subtitleSearch/SUBTITLE_DOWNLOADED';

export const fetchSubtitleSuggestions = query => async dispatch => {
  dispatch({
    type: IS_LOADING_CHANGED,
    isLoading: true,
  });
  const subtitleSuggestions = await Http(
    `/api/subtitles?${querystring.stringify({ query })}`,
  );
  dispatch({
    type: SUBTITLES_FETCHED,
    subtitleSuggestions,
  });
};

export const downloadSubtitle = (url, moviePath) => async dispatch => {
  const response = await Http(
    `/api/subtitles/download?${querystring.stringify({
      url,
      moviePath,
    })}`,
  );
  dispatch({
    type: SUBTITLE_DOWNLOADED,
  });
  dispatch({
    type: SUBITLE_URL_ADDED,
    subtitleUrl: response.subtitleUrl,
  });
};
