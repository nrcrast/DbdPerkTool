import React, { Component, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function PlainTextInput(props) {
  return (
    <Form.Group as={Row} controlId="formPlaintextPassword">
      <Form.Label column sm="5" className="field-label-text">
        {props.label}
      </Form.Label>
      <Col sm="10">
        <Form.Control type="plaintext" value={props.value} className="dbd-input-field" onChange={props.onChange} />
      </Col>
    </Form.Group>
  );
}
