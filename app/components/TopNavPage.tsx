import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Nav from 'react-bootstrap/Nav';
type MyProps = {
  to: string;
  currentActive: string;
  text: string;
  icon: string;
  setActive: Function;
};

const NavTextWrapper = styled.h3`
  margin-bottom: 0px;
`;

const NavWrapper = styled.div`
  display: flex;
  align-items:center;
`;

const NavIcon = styled.i`
margin-right: 8px;
`;

export default function TopNavPage(props: MyProps) {
  const isActive = props.currentActive === props.to;

  if (isActive) {
    return (
      <Nav.Link
        className="top-nav-active ml-2 mr-2"
        as={Link}
        to={props.to}
        onClick={() => {
          props.setActive(props.to);
        }}
      >
        <NavWrapper>
          <NavIcon className={props.icon} aria-hidden="true" />
          <NavTextWrapper>{props.text}</NavTextWrapper>
        </NavWrapper>
      </Nav.Link>
    );
  } else {
    return (
      <Nav.Link
        as={Link}
        to={props.to}
        className="ml-2 mr-2"
        onClick={() => {
          props.setActive(props.to);
        }}
      >
        <NavWrapper>
          <NavIcon className={props.icon} aria-hidden="true" />
          <NavTextWrapper>{props.text}</NavTextWrapper>
        </NavWrapper>
      </Nav.Link>
    );
  }
}
