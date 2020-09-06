import React, { Component, useState } from 'react';
import electron from 'electron';
import { shell } from 'electron';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import routes from '../constants/routes.json';
import TopNavPage from './TopNavPage';
import Image from 'react-bootstrap/Image';
import settingsUtil from '../settings/Settings';
import TopNavPageIcon from './TopNavPageIcon';
import MenuEntry from './Nav/MenuEntry';

const NavContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  padding-left: 10px;
`;

const NavWrapper = styled.div`
  width: 100%;
`;

const NavButtonContentWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const UserProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  margin-bottom: 8px;
  text-align: center;
`;

const BottomEntries = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
`;

const LogoLabel = styled.p`
  text-align: center;
`;

const NavigationLabel = styled.h4`
  text-align: center;
`;

const NavDivider = styled.hr``;

export default function SideNav() {
  function openDonate(e) {
    e.preventDefault();
    shell.openExternal(e.target.href);
  }
  const [activeTab, setActiveTab] = useState(routes.PERKS);
  const isSignedIn = true;
  console.log('Active Tab: ' + activeTab);
  return (
    <NavContentWrapper>
      <LogoWrapper>
        <Image src="./img/toolbox-logo.png" className="sidenav-logo" />
        <LogoLabel>{`Dead By Daylight Icon Toolbox v${(
          electron.app || electron.remote.app
        ).getVersion()}`}</LogoLabel>
      </LogoWrapper>
      {/* <NavigationLabel>Navigation</NavigationLabel> */}
      <MenuEntry
        text="Icon Packs"
        image="./img/menu_perk.png"
        currentActive={activeTab}
        to={routes.PERKS}
        onClick={(target: string) => {
          setActiveTab(target);
        }}
      />
      <MenuEntry
        text="Portrait Packs"
        image="./img/menu_portrait.png"
        currentActive={activeTab}
        to={routes.PORTRAITS}
        onClick={(target: string) => {
          setActiveTab(target);
        }}
      />
      <MenuEntry
        text="Install Default Icons"
        image="./img/menu_default.png"
        currentActive={activeTab}
        to={routes.DEFAULT}
        onClick={(target: string) => {
          setActiveTab(target);
        }}
      />
      {isSignedIn && (
        <div>
          <MenuEntry
            text="Upload Pack"
            currentActive={activeTab}
            to={routes.CREATE}
            image="./img/menu_add.png"
            onClick={(target: string) => {
              setActiveTab(target);
            }}
          />
          <MenuEntry
            text="My Packs"
            currentActive={activeTab}
            to={routes.CREATE}
            image="./img/menu_mypacks.png"
            onClick={(target: string) => {
              setActiveTab(target);
            }}
          />
        </div>
      )}

      <BottomEntries>
        <MenuEntry
          text="Settings"
          image="./img/menu_settings.png"
          currentActive={activeTab}
          to={routes.SETTINGS}
          onClick={(target: string) => {
            setActiveTab(target);
          }}
        />
        <MenuEntry
          text="About"
          image="./img/menu_about.png"
          currentActive={activeTab}
          to={routes.HOME}
          onClick={(target: string) => {
            setActiveTab(target);
          }}
        />
        <MenuEntry
          text={isSignedIn ? 'Sign Out' : 'Sign In'}
          image={
            isSignedIn ? './img/menu_sign_out.png' : './img/menu_sign_in.png'
          }
          currentActive={activeTab}
          to={routes.HOME}
          onClick={(target: string) => {
            setActiveTab(target);
          }}
        />
        {isSignedIn && (
          <MenuEntry
            text="My Profile"
            image="./img/menu_profile.png"
            currentActive={activeTab}
            to={routes.HOME}
            onClick={(target: string) => {
              setActiveTab(target);
            }}
          />
        )}

        <UserProfileWrapper>
          <Image src="./img/user.png" className="user-profile-placeholder" />
        </UserProfileWrapper>
      </BottomEntries>
    </NavContentWrapper>
  );
}
