import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Nav from 'react-bootstrap/Nav';
type MyProps = {
  to: string;
  currentActive: string;
  text: string;
  setActive: Function;
};

const NavTextWrapper = styled.h3`
  margin-bottom: 0px;
`;

export default function TopNavPage(props: MyProps) {
  const isActive = props.currentActive === props.to;

  if (isActive) {
    return (
      <Nav.Link
        className="top-nav-active"
        as={Link}
        to={props.to}
        onClick={() => {
          props.setActive(props.to);
        }}
      >
        <NavTextWrapper>{props.text}</NavTextWrapper>
      </Nav.Link>
    );
  } else {
    return (
      <Nav.Link
        as={Link}
        to={props.to}
        onClick={() => {
          props.setActive(props.to);
        }}
      >
        <NavTextWrapper>{props.text}</NavTextWrapper>
      </Nav.Link>
    );
  }
}
