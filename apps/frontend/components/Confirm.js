// @flow

import * as React from 'react';
import { Modal, Button } from 'react-bootstrap';

type Props = {|
  +show: boolean,
  +close: () => void,
  +title: string,
  +body: React.Node,
  +successCallback: () => void,
|};

const Confirm = ({ show, close, title, body, successCallback }: Props) => (
  <Modal show={show}>
    <Modal.Header>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>

    <Modal.Body>{body}</Modal.Body>

    <Modal.Footer>
      <Button onClick={close}>Cancel</Button>
      <Button variant="primary" onClick={successCallback}>
        Ok
      </Button>
    </Modal.Footer>
  </Modal>
);

export default Confirm;
