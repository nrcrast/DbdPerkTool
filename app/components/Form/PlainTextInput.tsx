import React, { Component, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Typeahead } from 'react-bootstrap-typeahead';
import styled from 'styled-components';

type MyProps = {
  onChange: Function;
  onInputChange: Function;
  options: any;
  value: string;
  label: string;
};

const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InputValueWrapper = styled.div`
  flex: 1;
  margin-left: 10px;
`;

export default function PlainTextInput(props: MyProps) {
  let input;

  if (props.options) {
    input = (
      <Typeahead
        onChange={props.onChange}
        onInputChange={props.onInputChange}
        allowNew={true}
        labelKey='name'
        options={props.options}
      />
    );
  } else {
    input = (
      <Form.Control
        type="plaintext"
        value={props.value}
        className="dbd-input-field"
        onChange={props.onChange}
      />
    );
  }
  return (
    <Form.Group>
      <InputWrapper>
        <Form.Label className="field-label-text">{props.label}</Form.Label>
        <InputValueWrapper>{input}</InputValueWrapper>
      </InputWrapper>
    </Form.Group>
  );
}
