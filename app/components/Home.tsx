import React, { Component, useState } from 'react';
import electron from 'electron';
const {shell, ipcRenderer} = electron;
import log from 'electron-log';
import UpdateYesNoDialog from './update/UpdateYesNoDialog';
import UpdateProgress from './update/UpdateProgress';
import PatronList from './PatronList';

type MyProps = {};
type MyState = { showUpdateModal: boolean, latestVersion: string, showProgressModal:boolean, updateProgress: number };

export default class Home extends Component<MyProps, MyState> {
  constructor(params: {}) {
    super(params);
    this.state = {
      showUpdateModal: false,
      latestVersion: '',
      showProgressModal: false,
      updateProgress: 0
    }
    const currentComponent = this;
    log.info('Loading home');
    ipcRenderer.on('update-available', (event, arg) => {
      currentComponent.setState({showUpdateModal: true, latestVersion: arg.version});
    });

    ipcRenderer.on('update-progress', (event, arg) => {
      log.info('Update: ', arg);
      this.setState({
        showProgressModal: true,
        updateProgress: parseInt(arg.percent)
      });
    });
  }

  onUpdateModalClose(doUpdate) {
    log.info('Do Update: ', doUpdate);
    this.setState({
      showUpdateModal: false,
      showProgressModal: doUpdate
    });
    ipcRenderer.send('update-available-resp', doUpdate);
  }

  render() {
    return (
      <div>
        <h1 className="text-center">Dead By Daylight Icon Toolbox v{(electron.app || electron.remote.app).getVersion()}</h1>
        <p>
          This is a tool designed to help you browse and install Perks and Icon
          sets with the click of a button!
        </p>
        <h3 className="text-center">Usage</h3>
        <p>
          Head over to the{' '}
          <i>
            <strong>Icon Packs</strong>
          </i>{' '}
          tab to check out the available Icon packs, or go to the{' '}
          <i>
            <strong>Create</strong>
          </i>{' '}
          tab to make your own pack.
        </p>
        <h3 className="text-center">Creating Your Own Pack</h3>
        <p>
          Each pack must be in a directory structure similar to the following:
        </p>
  
        <code>C:\Users\Me\MyPerkDirectory</code>
        <br />
        <code>├── Actions</code>
        <br />
        <code>├── CharPortraits</code>
        <br />
        <code>├── Favors</code>
        <br />
        <code>├── ItemAddons</code>
        <br />
        <code>├── Items</code>
        <br />
        <code>├── Perks</code>
        <br />
        <code>├── Powers</code>
        <br />
        <code>└── StatusEffects</code>
        <br />
        <br />
  
        <p>
          The only required subdirectory is{' '}
          <i>
            <strong>Perks</strong>
          </i>
          . The rest can be left out depending on what your pack supports.
        </p>
  
        <h3 className="text-center">Help</h3>
        <p>
          You can get help at the Dead By Daylight Icon Toolbox{' '}
          <a
            href="#"
            onClick={function (e) {
              e.preventDefault();
              shell.openExternal('https://discord.gg/3WexstV');
            }}
          >
            Discord channel
          </a>{' '}
          or messaging /u/elpantalla on Reddit.
        </p>
        <PatronList/>
        <UpdateYesNoDialog version={this.state.latestVersion} show={this.state.showUpdateModal} onClose={this.onUpdateModalClose.bind(this)} />
        <UpdateProgress progress={this.state.updateProgress} show={this.state.showProgressModal}/>
      </div>
    );
  }
}