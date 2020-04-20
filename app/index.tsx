import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { remote } from 'electron';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import settingsUtil from './settings/Settings';
import './app.global.css';

const store = configureStore();

const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

const mainWindow = remote.getCurrentWindow();

mainWindow.removeMenu();
// mainWindow.setIcon(__dirname + '/img/icon.ico');

mainWindow.on('resize', () => {
  const [width] = mainWindow.getSize();
  const aspectRatio = 16 / 9;
  const newHeight = Math.floor(width / aspectRatio);
  mainWindow.setSize(width, newHeight);
});

document.addEventListener('DOMContentLoaded', () => {
  settingsUtil.read().then(() => {
    render(
      <AppContainer>
        <Root store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
});
