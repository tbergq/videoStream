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
import PropTypes from 'prop-types';

const ButtonWrapper = styled('span')([], {
  marginLeft: '8px',
  display: 'flex',
  button: {
    paddingTop: '8px',
    paddingBottom: '8px',
  },
});
const SPACE_KEY = 32;

export default class ChromeCastControls extends React.Component {
  constructor() {
    super();

    this.playOrPause = this.playOrPause.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.stop = this.stop.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keypress', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keypress', this.handleKeyPress);
  }

  playOrPause() {
    this.props.playerController.playOrPause();
  }

  stop() {
    this.props.playerController.stop();
  }

  fastForward = () => {
    this.seek(10);
  };

  fastRewind = () => {
    this.seek(-10);
  };

  seek = time => {
    const { playerController, player } = this.props;
    player.currentTime += time;
    playerController.seek();
  };

  handleKeyPress(event) {
    switch (event.keyCode) {
      case SPACE_KEY:
        this.playOrPause();
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <React.Fragment>
        <ButtonWrapper>
          <Button onClick={this.playOrPause}>
            {this.props.player.isPaused ? <MdPlayArrow /> : <MdPause />}
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

ChromeCastControls.propTypes = {
  playerController: PropTypes.shape({
    playOrPause: PropTypes.func.isRequired,
    getFormattedTime: PropTypes.func.isRequired,
    stop: PropTypes.func.isRequired,
  }).isRequired,
  player: PropTypes.shape({
    isPaused: PropTypes.bool.isRequired,
  }).isRequired,
};
