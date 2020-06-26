import React, { Component } from 'react';
import {shell} from 'electron';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import routes from '../constants/routes.json';

export default function TopNav() {
  function openDonate(e) {
    e.preventDefault();
    let link = e.target.href;
    shell.openExternal(link);
  }
  return (
    <Navbar variant="dark" className="rounded shadow main-navbar">
      <Navbar.Brand>Icon Toolbox</Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to={routes.HOME}>
          About
        </Nav.Link>
        <Nav.Link as={Link} to={routes.SETTINGS}>
          Settings
        </Nav.Link>
        <Nav.Link as={Link} to={routes.DBD}>
          Icon Packs
        </Nav.Link>
        <Nav.Link as={Link} to={routes.PORTRAITS}>
          Portrait Packs
        </Nav.Link>
        <Nav.Link as={Link} to={routes.CREATE}>
          Create
        </Nav.Link>
      </Nav>
      <Nav className="ml-auto">
        <Button variant="secondary" href="https://www.patreon.com/dbdicontoolbox" onClick={openDonate}>Patreon</Button>
      </Nav>
      <Nav className="ml-3">
        <Button variant="secondary" href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=JWX35VP4RXA7A&source=url" onClick={openDonate}>Paypal</Button>
      </Nav>
    </Navbar>
  );
}
