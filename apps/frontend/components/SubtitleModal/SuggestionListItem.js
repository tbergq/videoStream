// @flow strict

import * as React from 'react';
import { ListGroupItem } from 'react-bootstrap';

type Props = {|
  +downloadSubtitles: string => void,
  +item: {|
    +url: string,
    +name: string,
  |},
|};

export default function SuggestionListItem(props: Props) {
  const { url, name } = props.item;
  const { downloadSubtitles } = props;
  const onClick = React.useCallback(() => {
    downloadSubtitles(url);
  }, [downloadSubtitles, url]);
  return <ListGroupItem onClick={onClick}>{name}</ListGroupItem>;
}
