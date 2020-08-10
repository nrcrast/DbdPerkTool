import React, { Component, useState } from 'react';
import electron from 'electron';
const { shell, ipcRenderer } = electron;
import log from 'electron-log';
import UpdateYesNoDialog from './update/UpdateYesNoDialog';
import UpdateProgress from './update/UpdateProgress';
import PatronList from './PatronList';
import settingsUtil from '../settings/Settings';

type MyProps = {};
type MyState = {
  showUpdateModal: boolean;
  latestVersion: string;
  showProgressModal: boolean;
  updateProgress: number;
};

export default class Home extends Component<MyProps, MyState> {
  constructor(params: {}) {
    super(params);
    this.state = {
      showUpdateModal: false,
      latestVersion: '',
      showProgressModal: false,
      updateProgress: 0
    };
    const currentComponent = this;
    log.info('Loading home');
    ipcRenderer.on('update-available', (event, arg) => {
      if (settingsUtil.settings.autoUpdate) {
        this.onUpdateModalClose(true);
      } else {
        currentComponent.setState({
          showUpdateModal: true,
          latestVersion: arg.version
        });
      }
    });

    ipcRenderer.on('update-progress', (event, arg) => {
      log.info('Update: ', arg);
      this.setState({
        showProgressModal: true,
        updateProgress: parseInt(arg.percent)
      });
    });
  }

  onUpdateModalClose(doUpdate: boolean) {
    log.info('Do Update: ', doUpdate);
    this.setState({
      showUpdateModal: false,
      showProgressModal: doUpdate
    });
    ipcRenderer.send('update-available-resp', doUpdate);
  }

  render() {
    return (
      <div className="text-center">
        <h1>
          Dead By Daylight Icon Toolbox v
          {(electron.app || electron.remote.app).getVersion()}
        </h1>
        <p>
          This is a tool designed to help you browse and install Perks and Icon
          sets with the click of a button!
        </p>
        <h3>Usage</h3>
        <p>
          Head over to the{' '}
          <i>
            <strong>Icon Packs</strong>
          </i>{' '}
          tab to check out the available Icon packs, or go to the{' '}
          <i>
            <strong>Portrait Packs</strong>
          </i>{' '}
          tab to see Portrait-Only packs!
        </p>

        <h3>Help</h3>
        <p>
          You can get help at the Dead By Daylight Icon Toolbox{' '}
          <a
            href="#"
            onClick={function(e) {
              e.preventDefault();
              shell.openExternal('https://discord.gg/3WexstV');
            }}
          >
            Discord channel
          </a>{' '}
          or by messaging /u/elpantalla on Reddit.
        </p>
        <PatronList />
        <UpdateYesNoDialog
          version={this.state.latestVersion}
          show={this.state.showUpdateModal}
          onClose={this.onUpdateModalClose.bind(this)}
        />
        <UpdateProgress
          progress={this.state.updateProgress}
          show={this.state.showProgressModal}
        />
      </div>
    );
  }
}
