// @flow

import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

import CastImage from '../../images/cast.png';
import Timer from './Timer';
import ChromeCastControls from './ChromeCastControls';
import {
  withChromeCastContext,
  type Player,
  type PlayerController,
} from '../../context/ChromeCastContext';

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

const ButtonContainer = styled.div({
  display: 'flex',
  justifyContent: 'stretch',
});

const back = () => {
  window.location.href = '/';
};

type Props = {|
  +player: ?Player,
  +playerController: ?PlayerController,
  +isCasting: boolean,
  +castContext: {|
    requestSession: () => Promise<void>,
  |},
  +setUpCastSession: () => void,
|};

type State = {|
  +currentTime: string,
|};

class ChromeCast extends React.Component<Props, State> {
  interval = null;

  constructor(props) {
    super(props);

    this.state = {
      currentTime: '00:00',
    };
  }

  componentDidUpdate() {
    const { playerController, player, isCasting } = this.props;
    if (isCasting && this.interval === null && playerController && player) {
      this.interval = setInterval(() => {
        this.setState({
          currentTime: playerController.getFormattedTime(player.currentTime),
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

const select = state => ({
  castContext: state.castContext,
  setUpCastSession: state.setUpCastSession,
  playerController: state.playerController,
  player: state.player,
  isCasting: state.isCasting,
});

export default withChromeCastContext(select)(ChromeCast);
