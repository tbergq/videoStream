import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const Confirm = ({ show, close, title, body, successCallback }) => (
  <Modal show={show}>
    <Modal.Header>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>

    <Modal.Body>{body}</Modal.Body>

    <Modal.Footer>
      <Button onClick={close}>Cancel</Button>
      <Button bsStyle="primary" onClick={successCallback}>
        Ok
      </Button>
    </Modal.Footer>
  </Modal>
);

Confirm.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.node.isRequired,
  successCallback: PropTypes.func.isRequired,
};

export default Confirm;
