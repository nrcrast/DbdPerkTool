import React, { Component, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Typeahead } from 'react-bootstrap-typeahead';
import styled from 'styled-components';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Badge from '../Badge';

type MyProps = {
  onChange: Function;
  onInputChange: Function;
  options: any;
  value: string;
  label: string;
  help?: any;
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
  let tooltip = undefined;

  const helpTxt = props.help;

  if(props.help) {
    const renderTooltip = props => (
      <Tooltip id="pti-tooltip" {...props}>
        {helpTxt}
      </Tooltip>
    );
    tooltip = (
      <OverlayTrigger
      placement="right"
      delay={{ show: 250, hide: 1000 }}
      overlay={renderTooltip}
      trigger={['click']}
    >
      <Badge className="fas fa-question-circle ml-2"></Badge>
    </OverlayTrigger>
    )
  }

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
        {tooltip}
        <InputValueWrapper>{input}</InputValueWrapper>
      </InputWrapper>
    </Form.Group>
  );
}
