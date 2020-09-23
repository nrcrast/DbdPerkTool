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
  show: any;
  onHide: any;
  onConfirm: any;
};

export default function UpdatePackModal(props: MyProps) {
  const [notificationFile, setNotificationFile] = useState('');
  const [notificationName, setNotificationName] = useState('');

  const pickFile = async () => {
    const dir = await dialog.showOpenDialog({
      properties: ['openFile']
    });

    if (!dir.canceled && dir.filePaths.length > 0) {
      setNotificationFile(dir.filePaths[0]);
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
          Send Notification
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
		<PlainTextInput
                label="Title"
                value={notificationName}
                onChange={e => setNotificationName(e.target.value)}
              />
          <Form.Row>
            <Col sm="10">
              <Form.Control
                type="plaintext"
                value={notificationFile}
                className="dbd-input-field"
                onChange={e => {
                  setNotificationFile(e.target.value);
                }}
              />
            </Col>
            <Col>
              <Button variant="secondary" onClick={pickFile}>
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
            props.onConfirm(notificationFile, notificationName);
          }}
        >
          Send
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
