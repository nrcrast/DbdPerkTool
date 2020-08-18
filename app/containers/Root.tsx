import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import { Store } from '../reducers/types';
import Routes from '../Routes';
import TopNav from '../components/TopNav';
import Row from 'react-bootstrap/Row';
import styled from 'styled-components';
import { ipcRenderer } from 'electron';
import log from 'electron-log';
import UpdateYesNoDialog from '../components/update/UpdateYesNoDialog';
import UpdateProgress from '../components/update/UpdateProgress';
import settingsUtil from '../settings/Settings';
import Button from 'react-bootstrap/Button';

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
  flex-direction: column;
  height: 100vh;
`;

const Root = ({ store, history }: Props) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [latestVersion, setLatestVersion] = useState('');
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [updateProgress, setUpdateProgress] = useState(0);

  const onUpdateModalClose = (doUpdate: boolean) => {
    log.info('Do Update: ', doUpdate);
    setShowUpdateModal(false);
    setShowProgressModal(doUpdate);
    ipcRenderer.send('update-available-resp', doUpdate);
  };

  ipcRenderer.on('update-available', (event, arg) => {
    if (settingsUtil.settings.autoUpdate) {
      onUpdateModalClose(true);
    } else {
      setShowUpdateModal(true);
      setLatestVersion(arg.version);
    }
  });

  ipcRenderer.on('update-progress', (event, arg) => {
    log.info('Update: ', arg);
    setShowProgressModal(true);
    setUpdateProgress(parseInt(arg.percent));
  });

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MainContainer>
          <TopNav />
          <Content>
            <Row className="main-content shadow p-1 m-3 justify-content-center">
              <Routes />
            </Row>
          </Content>
          <UpdateYesNoDialog
            version={latestVersion}
            show={showUpdateModal}
            onClose={onUpdateModalClose}
          />
          <UpdateProgress progress={updateProgress} show={showProgressModal} />
        </MainContainer>
      </ConnectedRouter>
    </Provider>
  );
};

export default hot(Root);
