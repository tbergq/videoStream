import React from 'react';
import PropTypes from 'prop-types';

import CastImage from '../../images/cast.png';

class ChromeCast extends React.Component {
  constructor() {
    super();

    this.requestSession = this.requestSession.bind(this);
  }

  async requestSession() {
    const { castContext, setUpCastSession } = this.props;

    try {
      await castContext.requestSession();
      setUpCastSession();
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    return (
      <div className="ChromeCast">
        <button className="btn btn-default" onClick={this.requestSession}>
          <img src={CastImage} alt="Cast" />
        </button>
      </div>
    );
  }
}

ChromeCast.propTypes = {
  castContext: PropTypes.shape({
    requestSession: PropTypes.func.isRequired,
  }).isRequired,
  setUpCastSession: PropTypes.func.isRequired,
};

export default ChromeCast;
