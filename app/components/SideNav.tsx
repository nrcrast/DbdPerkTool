import React, { Component, useState, useContext } from 'react';
import electron from 'electron';
import { shell } from 'electron';
import styled from 'styled-components';
import routes from '../constants/routes.json';
import Image from 'react-bootstrap/Image';
import MenuEntry from './Nav/MenuEntry';
import api from '../api/Api';
import UserContext from '../context/UserContext';
import settingsUtil from '../settings/Settings';

import ToolboxLogo from '../img/toolbox-logo.png';
import UserImage from '../img/user.png';
import MenuDefaultImage from '../img/menu_default.png';
import MenuPortrait from '../img/menu_portrait.png';
import MenuProfile from '../img/menu_profile.png';
import MenuAbout from '../img/menu_about.png';
import MenuAdd from '../img/menu_add.png';
import MenuPerk from '../img/menu_perk.png';
import MenuMyPacks from '../img/menu_mypacks.png';
import MenuSettings from '../img/menu_settings.png';
import MenuSignOut from '../img/menu_sign_out.png';
import MenuSignIn from '../img/menu_sign_in.png';


const { BrowserWindow } = electron.remote;

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

async function signIn(onJwt) {
  const authWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    'node-integration': false,
    'web-security': false
  });

  // This is just an example url - follow the guide for whatever service you are using
  const authUrl = `${settingsUtil.get('targetServer')}/auth/steam`;

  authWindow.loadURL(authUrl);
  authWindow.show();
  // 'will-navigate' is an event emitted when the window.location changes
  // newUrl should contain the tokens you need
  authWindow.webContents.on('did-redirect-navigation', async function(
    event,
    newUrl
  ) {
    if (newUrl.startsWith(`${authUrl}/return`)) {
      const result = await authWindow.webContents.executeJavaScript(
        `document.querySelector('pre').innerText`
      );

      const jwtToken = JSON.parse(result);
      if (jwtToken.jwtToken) {
        onJwt(jwtToken);
        authWindow.close();
      }
      authWindow.close();
    }
  });
}

export default function SideNav() {
  function openDonate(e) {
    e.preventDefault();
    shell.openExternal(e.target.href);
  }
  const userContext = useContext(UserContext);
  const [activeTab, setActiveTab] = useState(routes.PERKS);
  const [signedIn, setSignedIn] = useState(api.currentUser !== null);
  console.log('Active Tab: ' + activeTab);

  let userIcon = (
    <Image src={UserImage} className="user-profile-placeholder" />
  );
  if (signedIn) {
    userIcon = (
      <Image
        src={api.currentUser.steamAvatarUrl}
        className="user-profile-placeholder"
        roundedCircle
      />
    );
  }

  return (
    <NavContentWrapper>
      <LogoWrapper>
        <Image src={ToolboxLogo} className="sidenav-logo" />
        <LogoLabel>{`Dead By Daylight Icon Toolbox v${(
          electron.app || electron.remote.app
        ).getVersion()}`}</LogoLabel>
      </LogoWrapper>
      {/* <NavigationLabel>Navigation</NavigationLabel> */}
      <MenuEntry
        text="Icon Packs"
        image={MenuPerk}
        currentActive={activeTab}
        to={routes.PERKS}
        onClick={(target: string) => {
          setActiveTab(target);
        }}
      />
      <MenuEntry
        text="Portrait Packs"
        image={MenuPortrait}
        currentActive={activeTab}
        to={routes.PORTRAITS}
        onClick={(target: string) => {
          setActiveTab(target);
        }}
      />
      <MenuEntry
        text="Install Default Icons"
        image={MenuDefaultImage}
        currentActive={activeTab}
        to={routes.DEFAULT}
        onClick={(target: string) => {
          setActiveTab(target);
        }}
      />
      {signedIn && (
        <div>
          {userContext.user.abilities.can('create', 'PerkPack') && (
            <MenuEntry
              text="Upload Pack"
              currentActive={activeTab}
              to={routes.CREATE}
              image={MenuAdd}
              onClick={(target: string) => {
                setActiveTab(target);
              }}
            />
          )}
          {userContext.user.abilities.can('update', 'PerkPack') && (
            <MenuEntry
              text="My Packs"
              currentActive={activeTab}
              to={routes.MY_PACKS}
              image={MenuMyPacks}
              onClick={(target: string) => {
                setActiveTab(target);
              }}
            />
          )}
        </div>
      )}

      <BottomEntries>
        <MenuEntry
          text="Settings"
          image={MenuSettings}
          currentActive={activeTab}
          to={routes.SETTINGS}
          onClick={(target: string) => {
            setActiveTab(target);
          }}
        />
        <MenuEntry
          text="About"
          image={MenuAbout}
          currentActive={activeTab}
          to={routes.HOME}
          onClick={(target: string) => {
            setActiveTab(target);
          }}
        />
        <MenuEntry
          text={signedIn ? 'Sign Out' : 'Sign In'}
          image={
            signedIn ? MenuSignOut : MenuSignIn
          }
          currentActive={activeTab}
          onClick={async (target: string) => {
            if (!signedIn) {
              signIn(async jwt => {
                if (jwt) {
                  await api.setLoggedIn(jwt);
                  userContext.setUser(api.currentUser);
                  setSignedIn(true);
                }
              });
            } else {
              await api.setLoggedOut();
              setSignedIn(false);
              userContext.setUser(null);
            }
          }}
        />
        {signedIn && (
          <MenuEntry
            text="My Profile"
            image={MenuProfile}
            currentActive={activeTab}
            to={routes.HOME}
            onClick={(target: string) => {
              setActiveTab(target);
            }}
          />
        )}

        <UserProfileWrapper>
          {userIcon}
          {signedIn && <h5>{api.currentUser.steamDisplayName}</h5>}
        </UserProfileWrapper>
      </BottomEntries>
    </NavContentWrapper>
  );
}
