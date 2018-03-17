import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

import CastImage from '../../images/cast.png';

const ChromeCastContainer = styled.div`
  margin-top: 10px;
`;

const BackButtonWrapper = styled.span`
  margin-left: 8px;
  button {
    padding-top: 8px;
    padding-bottom: 8px;
  }
`;

const back = () => {
  window.location.href = '/';
};

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
      <ChromeCastContainer className="ChromeCast">
        <Button onClick={this.requestSession}>
          <img src={CastImage} alt="Cast" />
        </Button>
        <BackButtonWrapper>
          <Button onClick={back}>Back</Button>
        </BackButtonWrapper>
      </ChromeCastContainer>
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
