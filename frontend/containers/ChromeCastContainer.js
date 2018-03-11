import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isUndefined from 'lodash/isUndefined';

import { getChromeCastReducer } from '../redux/reducers';
import {
  setCastContext,
  setUpCastSession,
  startCast,
  castingStopped,
} from '../redux/actions/ChromeCastActions';
import ChromeCast from '../components/ChromeCast/ChromeCast';

class ChromeCastContainer extends React.Component {
  componentDidMount() {
    const interval = setInterval(() => {
      if (!isUndefined(cast)) {
        this.initializeCastApi();
        clearInterval(interval);
      }
    }, 250);
  }

  initializeCastApi() {
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
            cast.framework.CastContext.getInstance().getCurrentSession(),
          );
        } else if (event.castState === 'NOT_CONNECTED') {
          this.props.castingStopped();
        }
      },
    );

    this.props.setCastContext(castContext);
  }

  render() {
    return (
      <div>{this.props.castContext && <ChromeCast {...this.props} />}</div>
    );
  }
}

const mapStateToProps = state => ({
  ...getChromeCastReducer(state),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setCastContext: castContext => dispatch(setCastContext(castContext)),
  setUpCastSession: () => dispatch(setUpCastSession()),
  startCast: session =>
    dispatch(startCast(ownProps.movieUrl, ownProps.subtitleUrl, session)),
  castingStopped: () => dispatch(castingStopped()),
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

export default connect(mapStateToProps, mapDispatchToProps)(
  ChromeCastContainer,
);
