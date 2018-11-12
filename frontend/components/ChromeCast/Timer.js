import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled('div')([], {
  marginBottom: '8px',
});

const Slider = styled('div')([], {
  height: '10px',
  border: '1px solid #e2e2e2',
  borderRadius: '5px',
  marginBottom: '8px',
  position: 'relative',
});

const Dot = styled('div')([], props => ({
  position: 'absolute',
  height: '20px',
  width: '20px',
  borderRadius: '10px',
  backgroundColor: 'deeppink',
  top: '-5',
  left: `${props.left}%`,
  marginLeft: '-5px',
}));

const ColoredSliderArea = styled('div')([], props => ({
  backgroundColor: 'deeppink',
  width: `${props.width}%`,
  height: '100%',
  borderRadius: '10px 0 0 10px',
}));

const Timer = props => {
  const percentPlayed =
    (props.player.currentTime / props.player.duration) * 100;
  return (
    <Container>
      <Slider>
        <ColoredSliderArea width={percentPlayed} />
        <Dot left={percentPlayed} />
      </Slider>
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
  }).isRequired,
  player: PropTypes.shape({
    currentTime: PropTypes.number.isRequired,
    duration: PropTypes.number.isRequired,
  }).isRequired,
  time: PropTypes.number.isRequired,
};

export default Timer;
