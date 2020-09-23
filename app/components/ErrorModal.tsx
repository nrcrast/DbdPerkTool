import React, { Component, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type MyProps = { show: any, onHide: any, title: string, text:string };

export default function ErrorModal(props: MyProps) {
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
			Error
		  </Modal.Title>
		</Modal.Header>
		<Modal.Body>
		  <h4>{props.title}</h4>
		  <p>
			{props.text}
		  </p>
		</Modal.Body>
		<Modal.Footer>
		  <Button variant="secondary" onClick={props.onHide}>Close</Button>
		</Modal.Footer>
	  </Modal>
	);
  }