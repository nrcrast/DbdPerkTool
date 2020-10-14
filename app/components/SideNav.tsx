import React, { Component, useState, useContext, useEffect } from 'react';
import electron from 'electron';
import { shell } from 'electron';
import styled from 'styled-components';
import routes from '../constants/routes.json';
import Image from 'react-bootstrap/Image';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import MenuEntry from './Nav/MenuEntry';
import api from '../api/Api';
import UserContext from '../context/UserContext';
import settingsUtil from '../settings/Settings';
import ConfirmationModal from './ConfirmationModal';
import Social from './Social';

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
import MenuAdmin from '../img/menu_admin.png';
import MenuVote from '../img/menu_vote.png';

const { BrowserWindow } = electron.remote;

const NavContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 200px;
  padding-left: 10px;
  background: rgba(0, 0, 0, 0.5);
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

const SignInWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const BottomEntries = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
`;

const LogoLabel = styled.p`
  text-align: center;
`;

async function signIn(onJwt) {
  const authWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    //frame: false,
    autoHideMenuBar: true,
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
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);
  const [showVote, setShowVote] = useState(false);
  const [activeTab, setActiveTab] = useState(routes.PERKS);
  const [signedIn, setSignedIn] = useState(api.currentUser !== null);
  console.log('Active Tab: ' + activeTab);

  let userIcon = <Image src={UserImage} className="user-profile-placeholder" />;
  if (signedIn) {
    userIcon = (
      <Image
        src={api.currentUser.steamAvatarUrl}
        className="user-profile-placeholder"
        roundedCircle
      />
    );
  }

  const renderTooltip = props => (
    <Tooltip id="writepack-tooltip" {...props}>
      Sign in via Steam for features such as adding packs to your favorites and
      uploading your own!
    </Tooltip>
  );

  const getServerConfig = async () => {
    const config = await api.executor.apis.default.getConfig();
    setShowVote(config.voteActive);
  };

  useEffect(() => {
    getServerConfig();
  }, []);

  return (
    <NavContentWrapper>
      <LogoWrapper>
        <Image src={ToolboxLogo} className="sidenav-logo" />
        <LogoLabel>{`Dead By Daylight Icon Toolbox v${(
          electron.app || electron.remote.app
        ).getVersion()}`}</LogoLabel>
        <Social />
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
      {showVote && (
        <MenuEntry
          text="Featured Pack Vote"
          image={MenuVote}
          currentActive={activeTab}
          to={routes.VOTE}
          onClick={(target: string) => {
            setActiveTab(target);
          }}
        />
      )}

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

      {signedIn && userContext.user.abilities.can('manage', 'all') && (
        <MenuEntry
          text="Admin"
          currentActive={activeTab}
          to={routes.ADMIN}
          image={MenuAdmin}
          onClick={(target: string) => {
            setActiveTab(target);
          }}
        />
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
        {signedIn && (
          <MenuEntry
            text="My Profile"
            image={MenuProfile}
            currentActive={activeTab}
            to={routes.MY_PROFILE}
            onClick={(target: string) => {
              setActiveTab(target);
            }}
          />
        )}
        <SignInWrapper>
          <MenuEntry
            text={signedIn ? 'Sign Out' : 'Sign In'}
            image={signedIn ? MenuSignOut : MenuSignIn}
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
                setShowSignOutConfirm(true);
              }
            }}
          />
          {!signedIn && (
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <i className="fas fa-question-circle fa-lg ml-2 mr-2"></i>
            </OverlayTrigger>
          )}
        </SignInWrapper>

        <UserProfileWrapper>
          {userIcon}
          {signedIn && <h5>{api.currentUser.steamDisplayName}</h5>}
        </UserProfileWrapper>
      </BottomEntries>
      <ConfirmationModal
        show={showSignOutConfirm}
        onHide={() => setShowSignOutConfirm(false)}
        title="Sign Out"
        text="Are you sure you want to Sign Out?"
        onConfirm={async () => {
          await api.setLoggedOut();
          setSignedIn(false);
          userContext.setUser(null);
          setShowSignOutConfirm(false);
        }}
      />
    </NavContentWrapper>
  );
}
