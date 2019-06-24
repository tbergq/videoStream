// @flow

import * as React from 'react';
import { FormGroup, Badge, FormControl, Button } from 'react-bootstrap';
import styled from 'styled-components';

const SubmitContainer = styled('span')([], {
  display: 'flex',
  justifyContent: 'flex-end',
  button: {
    marginTop: '5px',
  },
});

type Props = {|
  +moviePath: string,
  +onSubmit: string => Promise<void>,
|};

export default function SearchForm(props: Props) {
  const { onSubmit: propsOnSubmit } = props;
  const [query, setQuery] = React.useState(props.moviePath);

  const onChange = React.useCallback(
    (e: SyntheticInputEvent<HTMLInputElement>) => {
      setQuery(e.target.value);
    },
    [],
  );

  const onSubmit = React.useCallback(
    (e: SyntheticEvent<HTMLFormElement>) => {
      e.preventDefault();
      propsOnSubmit(query);
    },
    [propsOnSubmit, query],
  );

  return (
    <form onSubmit={onSubmit}>
      <FormGroup>
        <Badge>Movie name</Badge>
        <FormControl type="text" value={query} onChange={onChange} />
        <SubmitContainer>
          <Button type="submit" variant="primary">
            Search
          </Button>
        </SubmitContainer>
      </FormGroup>
    </form>
  );
}
