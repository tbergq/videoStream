import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';

export default function FilterInput({ value, onChange, clear }) {
  return (
    <FormGroup>
      <InputGroup>
        <FormControl
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search"
        />
        <InputGroup.Button>
          <Button onClick={clear}>X</Button>
        </InputGroup.Button>
      </InputGroup>
    </FormGroup>
  );
}

FilterInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  clear: PropTypes.func.isRequired,
};
