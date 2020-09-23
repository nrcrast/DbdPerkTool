import React, { Component, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { remote } from 'electron';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import PlainTextInput from '../Form/PlainTextInput';
import Spinner from 'react-bootstrap/Spinner';

const { dialog } = remote;

type MyProps = {
  name: string;
  show: any;
  onHide: any;
  onConfirm: any;
  operationInProgress: boolean;
  updatePercent: number;
};

export default function UpdatePackModal(props: MyProps) {
  const [packDir, setPackDir] = useState('');

  const pickPackDir = async () => {
    const dir = await dialog.showOpenDialog({
      properties: ['openDirectory']
    });

    if (!dir.canceled && dir.filePaths.length > 0) {
      setPackDir(dir.filePaths[0]);
    }
  };

  return (
    <Modal
      show={props.show}
      size="lg"
      onHide={() => {
        props.onHide();
      }}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Pack {props.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Row>
            <Col sm="10">
              <Form.Control
                type="plaintext"
                value={packDir}
                className="dbd-input-field"
                onChange={e => {
                  setPackDir(e.target.value);
                }}
              />
            </Col>
            <Col>
              <Button variant="secondary" onClick={pickPackDir}>
                Browse
              </Button>
            </Col>
          </Form.Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            props.onConfirm(packDir);
          }}
        >
          {' '}
          {props.operationInProgress && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              className="mr-2"
              role="status"
              aria-hidden="true"
            />
          )}
          Upload
        </Button>
      </Modal.Footer>
      {props.operationInProgress && (
        <ProgressBar
          now={props.updatePercent}
          label={`${props.updatePercent}%`}
        />
      )}
    </Modal>
  );
}
