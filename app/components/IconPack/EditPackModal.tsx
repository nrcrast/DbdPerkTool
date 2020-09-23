import React, { Component, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import PlainTextInput from '../Form/PlainTextInput';
import Spinner from 'react-bootstrap/Spinner';

type MyProps = {
  show: any;
  onHide: any;
  onConfirm: any;
  packName: string;
  packDescription: string;
  operationInProgress: boolean;
};

export default function EditPackModal(props: MyProps) {
  const [packName, setPackName] = useState(props.packName);
  const [packDesc, setPackDesc] = useState(props.packDescription);
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
        <Modal.Title id="contained-modal-title-vcenter">Edit Pack</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <PlainTextInput
            label="Pack Name"
            value={packName}
            onChange={e => setPackName(e.target.value)}
          />
          <PlainTextInput
            label="Pack Description"
            value={packDesc}
            onChange={e => setPackDesc(e.target.value)}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="info"
          onClick={() => {
            props.onConfirm(packName, packDesc);
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
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
