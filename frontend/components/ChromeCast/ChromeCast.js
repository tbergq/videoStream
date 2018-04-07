import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

import CastImage from '../../images/cast.png';

const SPACE_KEY = 32;
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
    this.playOrPause = this.playOrPause.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  
  componentDidUpdate() {
    if(this.props.isCasting) {
      window.addEventListener('keypress', this.handleKeyPress);
    } else if (!this.props.isCasting) {
      window.removeEventListener('keypress', this.handleKeyPress);
    }
  }

  handleKeyPress(event) {
    switch (event.keyCode) {
      case SPACE_KEY:
        this.playOrPause();
        break;
      default:
        break;
    }
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

  playOrPause() {
    this.props.playerController.playOrPause();
  }


  render() {
    console.log(this.props);
    return (
      <ChromeCastContainer className="ChromeCast">
        <Button onClick={this.requestSession}>
          <img src={CastImage} alt="Cast" />
        </Button>
        <BackButtonWrapper>
          <Button onClick={back}>Back</Button>
        </BackButtonWrapper>
        {this.props.isCasting && <BackButtonWrapper><Button onClick={this.playOrPause}>Play/Pause</Button></BackButtonWrapper>}
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
