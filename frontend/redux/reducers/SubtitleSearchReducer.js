import {
  SUBTITLES_FETCHED,
  IS_LOADING_CHANGED,
  SUBTITLE_DOWNLOADED,
} from '../actions/SubtitleSearchActions';

const initialState = {
  subtitleSuggestions: [],
  isLoading: false,
};

export default function subtitleSearchReducer(state = initialState, action) {
  switch (action.type) {
    case SUBTITLES_FETCHED:
      return {
        ...state,
        subtitleSuggestions: action.subtitleSuggestions,
        isLoading: false,
      };
    case IS_LOADING_CHANGED:
      return { ...state, isLoading: action.isLoading };
    case SUBTITLE_DOWNLOADED:
      return { ...state, subtitleSuggestions: [], isLoading: false };
    default:
      return state;
  }
}
