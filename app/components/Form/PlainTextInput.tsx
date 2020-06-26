import React, { Component, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Typeahead } from 'react-bootstrap-typeahead';

export default function PlainTextInput(props) {
  let input;

  if(props.options) {
    input = <Typeahead
    onChange={props.onChange}
    allowNew={true}
    options={props.options}
  />
  } else {
    input = <Form.Control type="plaintext" value={props.value} className="dbd-input-field" onChange={props.onChange} />
  }
  return (
    <Form.Group as={Row}>
      <Form.Label column sm="5" className="field-label-text">
        {props.label}
      </Form.Label>
      <Col sm="10">
        {input}
      </Col>
    </Form.Group>
  );
}
