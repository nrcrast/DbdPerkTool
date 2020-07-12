import React, { Component, useState } from 'react';
import {shell} from 'electron';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import routes from '../constants/routes.json';
import TopNavPage from './TopNavPage';

export default function TopNav() {
  function openDonate(e) {
    e.preventDefault();
    let link = e.target.href;
    shell.openExternal(link);
  }
  const [activeTab, setActiveTab] = useState(routes.HOME);
  console.log('Active Tab: ' + activeTab);
  return (
    <Navbar variant="dark" className="rounded shadow main-navbar">
      <Navbar.Brand>Icon Toolbox</Navbar.Brand>
      <Nav>
        <TopNavPage currentActive={activeTab} text="About" to={routes.HOME} setActive={setActiveTab}/>
        <TopNavPage currentActive={activeTab} text="Settings" to={routes.SETTINGS} setActive={setActiveTab}/>
        <TopNavPage currentActive={activeTab} text="Icon Packs" to={routes.PERKS} setActive={setActiveTab}/>
        <TopNavPage currentActive={activeTab} text="Portrait Packs" to={routes.PORTRAITS} setActive={setActiveTab}/>
        <TopNavPage currentActive={activeTab} text="Create" to={routes.CREATE} setActive={setActiveTab}/>
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
