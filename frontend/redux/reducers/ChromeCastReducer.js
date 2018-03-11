import {
  GOT_CAST_SESSION,
  GOT_CAST_CONTEXT,
  CAST_STARTED,
  CAST_STOPPED,
} from '../actions/ChromeCastActions';

const initalState = {
  session: null,
  castContext: null,
  mediaInfo: null,
  player: null,
  playerController: null,
  isCasting: false,
};

export default function chromeCastReducer(state = initalState, action) {
  switch (action.type) {
    case GOT_CAST_SESSION:
      return { ...state, session: action.session };
    case GOT_CAST_CONTEXT:
      return { ...state, castContext: action.castContext };
    case CAST_STARTED:
      return {
        ...state,
        mediaInfo: action.mediaInfo,
        player: action.player,
        playerController: action.playerController,
        isCasting: action.isCasting,
      };
    case CAST_STOPPED:
      return { ...state, isCasting: action.isCasting };
    default:
      return state;
  }
}
