import React, { Component, useState } from 'react';
import electron from 'electron';
import PatronList from './PatronList';

type MyProps = {};
type MyState = {

};

export default class Home extends Component<MyProps, MyState> {
  constructor(params: {}) {
    super(params);
    this.state = {
    };
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
      </div>
    );
  }
}
