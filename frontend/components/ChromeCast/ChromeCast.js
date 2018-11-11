import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

import CastImage from '../../images/cast.png';
import Timer from './Timer';
import ChromeCastControls from './ChromeCastControls';
import { withChromeCastContext } from '../../context/ChromeCastContext';

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
  constructor(props) {
    super(props);

    this.state = {
      currentTime: '00:00',
    };
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

  requestSession = async () => {
    const { castContext, setUpCastSession } = this.props;

    try {
      await castContext.requestSession();
      setUpCastSession();
    } catch (err) {
      console.error(err); // eslint-disable-line no-console
    }
  };

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

const select = state => ({
  castContext: state.castContext,
  setUpCastSession: state.setUpCastSession,
  playerController: state.playerController,
  player: state.player,
  isCasting: state.isCasting,
});

export default withChromeCastContext(select)(ChromeCast);
