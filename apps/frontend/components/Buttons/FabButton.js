// @flow

import * as React from 'react';
import styled from 'styled-components';

const FAB = styled.button`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  position: fixed;
  bottom: 10;
  right: 10;
  background-color: ${props =>
    props.backgroundColor ? props.backgroundColor : 'deeppink'};
  color: white;
  outline: none;
  box-shadow: 5px 5px 5px gray;
`;

type Props = {|
  +onClick: () => void,
  +children: React.Node,
  +variant?: 'primary',
  +title?: string,
|};

const FabButton = ({ onClick, children, ...rest }: Props) => (
  <FAB onClick={onClick} {...rest}>
    {children}
  </FAB>
);

export default FabButton;
