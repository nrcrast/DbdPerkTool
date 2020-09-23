import React, { Component, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type MyProps = { show: any, onConfirm: any, onHide: any, title: string, text:string };

export default function ConfirmationModal(props: MyProps) {
	return (
	  <Modal
		show={props.show}
		size="lg"
		onHide={props.onHide}
		aria-labelledby="contained-modal-title-vcenter"
		centered
	  >
		<Modal.Header closeButton>
		  <Modal.Title id="contained-modal-title-vcenter">
			{props.title}
		  </Modal.Title>
		</Modal.Header>
		<Modal.Body>
		  <h5>{props.text}</h5>
		</Modal.Body>
		<Modal.Footer>
		  <Button variant="secondary" onClick={props.onConfirm}>Yes</Button>
		  <Button variant="secondary" onClick={props.onHide}>No</Button>
		</Modal.Footer>
	  </Modal>
	);
  }