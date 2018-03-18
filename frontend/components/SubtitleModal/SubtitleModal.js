import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

import SearchForm from './SearchForm';
import SuggestionList from './SuggestionList';

const SubtitleModal = ({
  showModal,
  toggleModal,
  moviePath,
  fetchSubtitleSuggestions,
  subtitleSuggestions,
  isLoading,
  downloadSubtitles,
}) => (
  <Modal show={showModal} bsSize="large">
    <Modal.Header>
      <Modal.Title>Search for subtitles</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <SearchForm moviePath={moviePath} onSubmit={fetchSubtitleSuggestions} />
      {isLoading && <div>...Searching for subtitles</div>}
      <SuggestionList
        subtitleSuggestions={subtitleSuggestions}
        downloadSubtitles={downloadSubtitles}
      />
    </Modal.Body>

    <Modal.Footer>
      <Button onClick={toggleModal}>Close</Button>
    </Modal.Footer>
  </Modal>
);

SubtitleModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  moviePath: PropTypes.string.isRequired,
  fetchSubtitleSuggestions: PropTypes.func.isRequired,
  subtitleSuggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  downloadSubtitles: PropTypes.func.isRequired,
};

export default SubtitleModal;
