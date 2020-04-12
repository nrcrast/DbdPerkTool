import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import routes from '../constants/routes.json';

export default function TopNav() {
  return (
    <Navbar bg="dark" variant="dark" className="rounded shadow">
      <Navbar.Brand>DBD Perk Tool</Navbar.Brand>
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
      </Nav>
    </Navbar>
  );
}
