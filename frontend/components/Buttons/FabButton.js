import React from 'react';
import PropTypes from 'prop-types';
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

const FabButton = ({ onClick, children, ...rest }) => (
  <FAB onClick={onClick} {...rest}>
    {children}
  </FAB>
);

FabButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default FabButton;
