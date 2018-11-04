import React from 'react';
import PropTypes from 'prop-types';

import { ListGroup, ListGroupItem } from 'react-bootstrap';

const SuggestionList = ({ subtitleSuggestions, downloadSubtitles }) => (
  <ListGroup as="ul">
    {subtitleSuggestions.map(item => (
      <ListGroupItem
        onClick={() => {
          downloadSubtitles(item.url);
        }}
        key={item.url}
      >
        {item.name}
      </ListGroupItem>
    ))}
  </ListGroup>
);

SuggestionList.propTypes = {
  subtitleSuggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  downloadSubtitles: PropTypes.func.isRequired,
};

export default SuggestionList;
