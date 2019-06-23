// @flow

import React from 'react';

import ChromeCast from '../components/ChromeCast/ChromeCast';
import {
  withChromeCastContext,
  type CastContext,
  type Session,
} from '../context/ChromeCastContext';
import { withMoviePlayerContext } from '../context/MoviePlayerContext';

type Props = {|
  +moviePath: string,
  +subtitleUrl: string,
  +setCastContext: Function,
  +castContext: CastContext,
  +session: Session,
  +startCast: Function,
  +castingStopped: Function,
|};
class ChromeCastContainer extends React.Component<Props> {
  componentDidMount() {
    const interval = setInterval(() => {
      if (cast != null) {
        this.initializeCastApi();
        clearInterval(interval);
      }
    }, 250);
  }

  initializeCastApi = () => {
    const castContext = cast.framework.CastContext.getInstance();

    castContext.setOptions({
      receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
      autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
    });

    castContext.addEventListener(
      cast.framework.CastContextEventType.CAST_STATE_CHANGED,
      this.castStateChanged,
    );

    this.props.setCastContext(castContext);
  };

  castStateChanged = event => {
    const { moviePath, subtitleUrl } = this.props;
    if (event.castState === 'CONNECTED') {
      this.props.startCast(
        moviePath,
        subtitleUrl,
        cast.framework.CastContext.getInstance().getCurrentSession(),
      );
    } else if (event.castState === 'NOT_CONNECTED') {
      this.props.castingStopped();
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.props.castContext && <ChromeCast />}
      </React.Fragment>
    );
  }
}

const select = state => ({
  setCastContext: state.setCastContext,
  startCast: state.startCast,
  castingStopped: state.castingStopped,
  castContext: state.castContext,
});

export default withMoviePlayerContext(({ moviePath, subtitleUrl }) => ({
  moviePath,
  subtitleUrl,
}))(withChromeCastContext(select)(ChromeCastContainer));
