import querystring from 'querystring';

import Http from '../../utils/Http';

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
