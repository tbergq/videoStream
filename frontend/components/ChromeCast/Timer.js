import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Slider from 'rc-slider';

const Container = styled('div')([], {
  marginBottom: '8px',
  '.rc-slider-track': {
    backgroundColor: 'deeppink',
  },
  '.rc-slider-dot-active': {
    borderColor: 'deeppink',
  },
  '.rc-slider-handle': {
    border: 'solid 2px deeppink',
  },
});

const Timer = props => {
  function onChange(newTime) {
    const { player } = props;
    player.currentTime = newTime;
    props.playerController.seek();
  }

  return (
    <Container>
      <Slider
        max={props.player.duration}
        dots
        value={props.player.currentTime}
        onChange={onChange}
      />
      <div>
        {props.time}/
        {props.playerController.getFormattedTime(props.player.duration)}
      </div>
    </Container>
  );
};

Timer.propTypes = {
  playerController: PropTypes.shape({
    getFormattedTime: PropTypes.func.isRequired,
    seek: PropTypes.func.isRequired,
  }).isRequired,
  player: PropTypes.shape({
    currentTime: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
  }).isRequired,
  time: PropTypes.number.isRequired,
};

export default Timer;
