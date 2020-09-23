import React, { Component, useState, useEffect, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import Col from 'react-bootstrap/Col';
import PlainTextInput from '../Form/PlainTextInput';

type MyProps = {
  label: string;
  link: string;
  onChange: Function;
  onRemove: Function;
};

const LinkWrapper = styled.div`
  box-shadow: 0 0.5rem 1rem rgba(35, 132, 164, 0.6);
  padding: 10px;
  margin: 10px;
`;

const RemoveLinkWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-right: 10px;
  align-items: center;
`;

export default function AuthorLink(props: MyProps) {
  const [label, setLabel] = useState(props.label);
  const [link, setLink] = useState(props.link);

  const updateLabel = (value: string) => {
    setLabel(value);
    props.onChange(value, link);
  };

  const updateLink = (value: string) => {
    setLink(value);
    props.onChange(label, value);
  };

  return (
    <LinkWrapper>
      <RemoveLinkWrapper>
        <i
          onClick={() => {
            props.onRemove();
          }}
          className="fas fa-minus-circle fa-lg author-link-remove"
        ></i>
      </RemoveLinkWrapper>
      <PlainTextInput
        label="Name"
        value={label}
        onChange={e => updateLabel(e.target.value)}
      />
      <PlainTextInput
        label="Link"
        value={link}
        onChange={e => updateLink(e.target.value)}
      />
    </LinkWrapper>
  );
}
