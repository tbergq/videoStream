import React from 'react';
import PropTypes from 'prop-types';

import ChromeCast from '../components/ChromeCast/ChromeCast';
import { withChromeCastContext } from '../context/ChromeCastContext';

class ChromeCastContainer extends React.Component {
  componentDidMount() {
    const interval = setInterval(() => {
      if (cast != null) {
        this.initializeCastApi();
        clearInterval(interval);
      }
    }, 250);
  }

  initializeCastApi = () => {
    const { movieUrl, subtitleUrl } = this.props;
    const castContext = cast.framework.CastContext.getInstance();

    castContext.setOptions({
      receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
      autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED,
    });

    castContext.addEventListener(
      cast.framework.CastContextEventType.CAST_STATE_CHANGED,
      event => {
        console.log('cast state is', event.castState);
        if (event.castState === 'CONNECTED') {
          this.props.startCast(
            movieUrl,
            subtitleUrl,
            cast.framework.CastContext.getInstance().getCurrentSession(),
          );
        } else if (event.castState === 'NOT_CONNECTED') {
          this.props.castingStopped();
        }
      },
    );

    this.props.setCastContext(castContext);
  };

  render() {
    return <div>{this.props.castContext && <ChromeCast />}</div>;
  }
}

const select = state => ({
  setCastContext: state.setCastContext,
  startCast: state.startCast,
  castingStopped: state.castingStopped,
  castContext: state.castContext,
});

ChromeCastContainer.propTypes = {
  movieUrl: PropTypes.string.isRequired,
  subtitleUrl: PropTypes.string.isRequired,
  setCastContext: PropTypes.func.isRequired,
  castContext: PropTypes.object, //eslint-disable-line
  session: PropTypes.object,//eslint-disable-line
  startCast: PropTypes.func.isRequired,
  castingStopped: PropTypes.func.isRequired,
};

export default withChromeCastContext(select)(ChromeCastContainer);
