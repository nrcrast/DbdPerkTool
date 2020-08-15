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
  justify-content: center;
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
    shell.openExternal(e.target.href);
  }
  const [activeTab, setActiveTab] = useState(routes.PERKS);
  console.log('Active Tab: ' + activeTab);
  return (
    <Navbar variant="dark" className="rounded shadow main-navbar">
      <Navbar.Brand>
        <i className="fas fa-toolbox fa-lg"></i>
      </Navbar.Brand>
      <NavWrapper>
        <Nav>
          <NavContentWrapper>
            <TopNavPage
              currentActive={activeTab}
              icon="fab fa-jira fa-lg"
              text="Icon Packs"
              to={routes.PERKS}
              setActive={setActiveTab}
            />
            <TopNavPage
              currentActive={activeTab}
              icon="fas fa-portrait fa-lg"
              text="Portrait Packs"
              to={routes.PORTRAITS}
              setActive={setActiveTab}
            />
            <TopNavPage
              currentActive={activeTab}
              icon="fas fa-undo-alt fa-lg"
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
           <i className="fas fa-comment-dollar mr-1"></i> Patreon
          </Button>
        </NavButtonContentWrapper>
      </Nav>
    </Navbar>
  );
}
