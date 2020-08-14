import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
type MyProps = {
  to: string;
  currentActive: string;
  icon: string;
  setActive: Function;
};

export default function TopNavPageIcon(props: MyProps) {
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
        <i class={props.icon} aria-hidden="true"></i>
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
        <i class={props.icon} aria-hidden="true"></i>
      </Nav.Link>
    );
  }
}
