// @flow

import React from 'react';
import { ListGroup } from 'react-bootstrap';

import SuggestionListItem from './SuggestionListItem';

type Props = {|
  +subtitleSuggestions: $ReadOnlyArray<{| +url: string, +name: string |}>,
  +downloadSubtitles: string => void,
|};

const SuggestionList = ({ subtitleSuggestions, downloadSubtitles }: Props) => {
  return (
    <ListGroup as="ul">
      {subtitleSuggestions.map(item => (
        <SuggestionListItem
          key={item.url}
          item={item}
          downloadSubtitles={downloadSubtitles}
        />
      ))}
    </ListGroup>
  );
};

export default SuggestionList;
