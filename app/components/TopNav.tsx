import React, { Component, useState } from 'react';
import { shell } from 'electron';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import routes from '../constants/routes.json';
import TopNavPage from './TopNavPage';
import settingsUtil from '../settings/Settings';
import TopNavPageIcon from './TopNavPageIcon';

const NavContentWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
`;

const NavWrapper = styled.div`
  width: 100%;
`;

const NavButtonContentWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default function TopNav() {
  function openDonate(e) {
    e.preventDefault();
    let link = e.target.href;
    shell.openExternal(link);
  }
  const [activeTab, setActiveTab] = useState(routes.PERKS);
  console.log('Active Tab: ' + activeTab);
  return (
    <Navbar variant="dark" className="rounded shadow main-navbar">
      <Navbar.Brand>Icon Toolbox</Navbar.Brand>
      <NavWrapper>
        <Nav>
          <NavContentWrapper>
            <TopNavPage
              currentActive={activeTab}
              text="Icon Packs"
              to={routes.PERKS}
              setActive={setActiveTab}
            />
            <TopNavPage
              currentActive={activeTab}
              text="Portrait Packs"
              to={routes.PORTRAITS}
              setActive={setActiveTab}
            />
            <TopNavPage
              currentActive={activeTab}
              text="Default Icons"
              to={routes.DEFAULT}
              setActive={setActiveTab}
            />
            {settingsUtil.settings.showCreate && (
              <TopNavPage
                currentActive={activeTab}
                text="Create"
                to={routes.CREATE}
                setActive={setActiveTab}
              />
            )}
          </NavContentWrapper>
        </Nav>
      </NavWrapper>
      <Nav className="ml-auto">
        <NavButtonContentWrapper>
          <TopNavPageIcon
            currentActive={activeTab}
            icon="fa fa-cog fa-lg"
            to={routes.SETTINGS}
            setActive={setActiveTab}
          />
          <TopNavPageIcon
            currentActive={activeTab}
            icon="fa fa-info-circle fa-lg"
            to={routes.HOME}
            setActive={setActiveTab}
          />
          <Button
            variant="secondary"
            className="topnav-button"
            href="https://www.patreon.com/dbdicontoolbox"
            onClick={openDonate}
          >
            Patreon
          </Button>
          <Button
            variant="secondary"
            href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=JWX35VP4RXA7A&source=url"
            onClick={openDonate}
            className="topnav-button"
          >
            Paypal
          </Button>
        </NavButtonContentWrapper>
      </Nav>
    </Navbar>
  );
}
