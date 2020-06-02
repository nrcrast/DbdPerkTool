import React, { Component, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type MyProps = { packHas: any; show: boolean; onHide: any };

export default function PerkPackInstallOptionsModal(props: MyProps) {
	return (
	  <Modal
		show={props.show}
		size="lg"
		aria-labelledby="contained-modal-title-vcenter"
		centered
	  >
		<Modal.Header closeButton>
		  <Modal.Title id="contained-modal-title-vcenter">
			Options
		  </Modal.Title>
		</Modal.Header>
		<Modal.Body>
		  <h4>{props.text}</h4>
		</Modal.Body>
		<Modal.Footer>
		  <Button onClick={props.onHide}>Confirm</Button>
		</Modal.Footer>
	  </Modal>
	);
  }