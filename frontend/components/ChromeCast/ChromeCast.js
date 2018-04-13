import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

import CastImage from '../../images/cast.png';
import Timer from './Timer';
import ChromeCastControls from './ChromeCastControls';

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

const ButtonContainer = styled('div')([], {
  display: 'flex',
  justifyContent: 'stretch',
});

const back = () => {
  window.location.href = '/';
};

class ChromeCast extends React.Component {
  interval = null;
  constructor() {
    super();

    this.state = {
      currentTime: '00:00',
    };

    this.requestSession = this.requestSession.bind(this);
  }

  componentDidUpdate() {
    if (this.props.isCasting && this.interval === null) {
      this.interval = setInterval(() => {
        this.setState({
          currentTime: this.props.playerController.getFormattedTime(
            this.props.player.currentTime,
          ),
        });
      }, 1000);
    } else if (!this.props.isCasting) {
      clearInterval(this.interval);
      this.interval = null;
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

  render() {
    return (
      <ChromeCastContainer className="ChromeCast">
        {this.props.isCasting && (
          <Timer
            time={this.state.currentTime}
            playerController={this.props.playerController}
            player={this.props.player}
          />
        )}
        <ButtonContainer>
          <Button onClick={this.requestSession}>
            <img src={CastImage} alt="Cast" />
          </Button>
          <BackButtonWrapper>
            <Button onClick={back}>Back</Button>
          </BackButtonWrapper>
          {this.props.isCasting && (
            <ChromeCastControls
              playerController={this.props.playerController}
              player={this.props.player}
            />
          )}
        </ButtonContainer>
      </ChromeCastContainer>
    );
  }
}

ChromeCast.propTypes = {
  castContext: PropTypes.shape({
    requestSession: PropTypes.func.isRequired,
  }).isRequired,
  setUpCastSession: PropTypes.func.isRequired,
  playerController: PropTypes.shape({
    playOrPause: PropTypes.func.isRequired,
    getFormattedTime: PropTypes.func.isRequired,
    stop: PropTypes.func.isRequired,
  }).isRequired,
  player: PropTypes.shape({
    currentTime: PropTypes.number.isRequired,
  }).isRequired,
  isCasting: PropTypes.bool.isRequired,
};

export default ChromeCast;
