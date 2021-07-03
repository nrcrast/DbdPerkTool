import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import ReactHtmlParser from 'react-html-parser'; 

type MyProps = {
  onClose: Function;
  version: string;
  releaseNotes: string;
  show: boolean;
};

export default function UpdateYesNoDialog(props: MyProps) {
  return (
    <Modal show={props.show} onHide={() => {props.onClose(false)}}>
      <Modal.Header closeButton>
        <Modal.Title>New Update Available: v{props.version}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Modal.Title>Release Notes</Modal.Title>
        {ReactHtmlParser(props.releaseNotes)}
      </Modal.Body>
      <Modal.Body>Would you like to update now?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => {props.onClose(false)}}>
          No
        </Button>
        <Button variant="secondary" onClick={() => {props.onClose(true)}}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
