// @flow

import React from 'react';
import { FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';

type Props = {|
  +value: string,
  +onChange: Function,
  +clear: Function,
|};

export default function FilterInput({ value, onChange, clear }: Props) {
  return (
    <FormGroup>
      <InputGroup>
        <FormControl
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search"
        />
        <InputGroup.Append>
          <Button onClick={clear}>X</Button>
        </InputGroup.Append>
      </InputGroup>
    </FormGroup>
  );
}
