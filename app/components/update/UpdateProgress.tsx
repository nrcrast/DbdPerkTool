import Modal from 'react-bootstrap/Modal';
import ProgressBar from 'react-bootstrap/ProgressBar';
import React, { useState } from 'react';

export default function UpdateProgress(props) {
  return (
    <Modal
      show={props.show}
      onHide={() => {
        props.onClose(false);
      }}
    >
      <Modal.Header>
        <Modal.Title>DBD Icon Toolbox Update Download Progress</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ProgressBar now={props.progress} label={`${props.progress}%`} animated></ProgressBar>
      </Modal.Body>
    </Modal>
  );
}
