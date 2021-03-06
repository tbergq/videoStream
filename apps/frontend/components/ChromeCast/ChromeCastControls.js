// @flow

import React from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import {
  MdPlayArrow,
  MdPause,
  MdStop,
  MdFastForward,
  MdFastRewind,
} from 'react-icons/md';

import {
  type Player,
  type PlayerController,
} from '../../context/ChromeCastContext';

const ButtonWrapper = styled.span({
  marginLeft: '8px',
  display: 'flex',
  button: {
    paddingTop: '8px',
    paddingBottom: '8px',
  },
});
const SPACE_KEY = 32;

type Props = {|
  +playerController: ?PlayerController,
  +player: ?Player,
|};

export default class ChromeCastControls extends React.Component<Props> {
  componentDidMount() {
    window.addEventListener('keypress', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.handleKeyPress);
  }

  playOrPause = () => {
    const { playerController } = this.props;
    if (playerController != null) {
      playerController.playOrPause();
    }
  };

  stop = () => {
    const { playerController } = this.props;
    if (playerController != null) {
      playerController.stop();
    }
  };

  fastForward = () => {
    this.seek(10);
  };

  fastRewind = () => {
    this.seek(-10);
  };

  seek = (time: number) => {
    const { playerController, player } = this.props;
    if (playerController != null && player != null) {
      player.currentTime += time;
      playerController.seek();
    }
  };

  handleKeyPress = (event: any) => {
    switch (event.keyCode) {
      case SPACE_KEY:
        this.playOrPause();
        break;
      default:
        break;
    }
  };

  render() {
    return (
      <React.Fragment>
        <ButtonWrapper>
          <Button onClick={this.playOrPause}>
            {this.props.player?.isPaused ? <MdPlayArrow /> : <MdPause />}
          </Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <Button onClick={this.fastRewind}>
            <MdFastRewind />
          </Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <Button onClick={this.fastForward}>
            <MdFastForward />
          </Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <Button onClick={this.stop}>
            <MdStop />
          </Button>
        </ButtonWrapper>
      </React.Fragment>
    );
  }
}
