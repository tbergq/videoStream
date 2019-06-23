// @flow

import React from 'react';
import { Modal, Button } from 'react-bootstrap';

import SearchForm from './SearchForm';
import SuggestionList from './SuggestionList';

type Props = {|
  +showModal: boolean,
  +toggleModal: () => void,
  +movieName: string,
  +fetchSubtitleSuggestions: string => Promise<void>,
  +subtitleSuggestions: $ReadOnlyArray<{| +url: string, +name: string |}>,
  +isLoading: boolean,
  +downloadSubtitles: () => void,
|};
const SubtitleModal = ({
  showModal,
  toggleModal,
  fetchSubtitleSuggestions,
  subtitleSuggestions,
  isLoading,
  downloadSubtitles,
  movieName,
}: Props) => {
  const path = movieName;
  return (
    <Modal show={showModal} bsSize="large">
      <Modal.Header>
        <Modal.Title>Search for subtitles ({path})</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <SearchForm moviePath={path} onSubmit={fetchSubtitleSuggestions} />
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
};

export default SubtitleModal;
