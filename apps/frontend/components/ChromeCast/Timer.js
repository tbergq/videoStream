// @flow

import * as React from 'react';
import styled from 'styled-components';
import Slider from 'rc-slider';

import {
  type Player,
  type PlayerController,
} from '../../context/ChromeCastContext';

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

type Props = {|
  +playerController: ?PlayerController,
  +player: ?Player,
  +time: string,
|};

const Timer = (props: Props) => {
  const { player, playerController } = props;

  const onChange = React.useCallback(
    newTime => {
      if (player != null && playerController != null) {
        player.currentTime = newTime;
        playerController.seek();
      }
    },
    [player, playerController],
  );

  const getFormattedTime = playerController?.getFormattedTime;
  const duration = player?.duration;
  if (getFormattedTime == null || duration == null) {
    return null;
  }
  const formattedTime = `${props.time} / ${getFormattedTime(duration)}`;
  return (
    <Container>
      <Slider
        max={props.player?.duration}
        dots
        value={props.player?.currentTime}
        onChange={onChange}
      />
      <div>{formattedTime}</div>
    </Container>
  );
};

export default Timer;
