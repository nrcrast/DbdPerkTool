import React, { Component, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type MyProps = { show: any, onHide: any, title: string, text:string };

export default function SuccessModal(props: MyProps) {
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
		  <h4>{props.text}</h4>
		</Modal.Body>
		<Modal.Footer>
		  <Button variant="secondary" onClick={props.onHide}>Close</Button>
		</Modal.Footer>
	  </Modal>
	);
  }