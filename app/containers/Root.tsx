import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import { Store } from '../reducers/types';
import Routes from '../Routes';
import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';
import { ipcRenderer } from 'electron';
import log from 'electron-log';
import UpdateYesNoDialog from '../components/update/UpdateYesNoDialog';
import UpdateProgress from '../components/update/UpdateProgress';
import settingsUtil from '../settings/Settings';
import Button from 'react-bootstrap/Button';
import DeadByDaylight from '../steam/DeadByDaylight';
import ConfirmationModal from '../components/ConfirmationModal';
import UserContext from '../context/UserContext';
import Notification from '../components/Notification';
import axios from 'axios';
import api from '../api/Api';

type Props = {
  store: Store;
  history: History;
};

const Content = styled.div`
  flex: 1;
  overflow: hidden;
  padding-bottom: 6px;
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
`;

const Root = ({ store, history }: Props) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [latestVersion, setLatestVersion] = useState('');
  const [releaseNotes, setReleaseNotes] = useState('');
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [updateProgress, setUpdateProgress] = useState(0);
  const [showUpdateDbdPath, setShowUpdateDbdPath] = useState(false);
  const [detectedDbdPath, setDetectedDbdPath] = useState('');
  const [notification, setNotification] = useState({
    show: false,
    title: '',
    text: '',
    id: ''
  });
  const [currentUser, setCurrentUser] = useState(api.currentUser);

  const onUpdateModalClose = (doUpdate: boolean) => {
    log.info('Do Update: ', doUpdate);
    setShowUpdateModal(false);
    setShowProgressModal(doUpdate);
    ipcRenderer.send('update-available-resp', doUpdate);
  };

  ipcRenderer.on('update-available', (event, arg) => {
      log.info(`Update available: ${JSON.stringify(arg)}`);
      setShowUpdateModal(true);
      log.info(`Release notes: ${arg.releaseNotes}`);
      setReleaseNotes(arg.releaseNotes);
      setLatestVersion(arg.version);
  });

  ipcRenderer.on('update-progress', (event, arg) => {
    log.info('Update: ', arg);
    setShowProgressModal(true);
    setUpdateProgress(parseInt(arg.percent));
  });

  const popNotification = async () => {
    const notification = await api.popNotification();

    if (notification) {
      setNotification({
        show: true,
        id: notification._id,
        text: notification.text,
        title: notification.name
      });
    }
  };

  const checkDbdPath = async () => {
    const dbd = new DeadByDaylight();

    try {
      const dbdPath = await dbd.getInstallPath();
      log.info(`Detected DBD Path: ${dbdPath}`);
      if (dbdPath && dbdPath.length > 0 && dbdPath.toLowerCase() !== settingsUtil.settings.dbdInstallPath.toLowerCase()) {
        settingsUtil.settings.dbdInstallPath = detectedDbdPath;
        await settingsUtil.save();
      }
    } catch (err) {}
  };

  useEffect(() => {
    checkDbdPath();
    popNotification();
  }, []);

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <UserContext.Provider
          value={{
            user: currentUser,
            setUser: user => {
              setCurrentUser(user);
            }
          }}
        >
          <MainContainer>
            <SideNav />
            <Content>
              <Row className="main-content shadow m-2 justify-content-center">
                <Routes />
              </Row>
            </Content>
            <UpdateYesNoDialog
              version={latestVersion}
              releaseNotes={releaseNotes}
              show={showUpdateModal}
              onClose={onUpdateModalClose}
            />
            <UpdateProgress
              progress={updateProgress}
              show={showProgressModal}
            />
            <Notification
              show={notification.show}
              id={notification.id}
              title={notification.title}
              text={notification.text}
              onHide={async () => {
                setNotification({ show: false, id: '', text: '', title: '' });
                try {
                  await popNotification();
                } catch (err) {
                  logger.error(err);
                }
              }}
            />
          </MainContainer>
        </UserContext.Provider>
      </ConnectedRouter>
    </Provider>
  );
};

export default hot(Root);
