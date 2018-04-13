import React from 'react';
import styled from 'styled-components';
import { Button, Glyphicon } from 'react-bootstrap';
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
            <Glyphicon glyph={this.props.player.isPaused ? 'play' : 'pause'} />
          </Button>
        </ButtonWrapper>
        <ButtonWrapper>
          <Button onClick={this.stop}>
            <Glyphicon glyph="stop" />
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
