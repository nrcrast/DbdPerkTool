import React, { Component, useState } from 'react';
import electron from 'electron';
import PatronList from './PatronList';
import styled from 'styled-components';
import { shell } from 'electron';

type MyProps = {};
type MyState = {

};

const HomeWrapper = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export default class Home extends Component<MyProps, MyState> {
  constructor(params: {}) {
    super(params);
    this.state = {
    };
  }

  render() {
    return (
      <HomeWrapper>
      <div className="text-center">
        <h1>
          Dead By Daylight Icon Toolbox v
          {(electron.app || electron.remote.app).getVersion()}
        </h1>
        <p>
          This is a tool designed to help you browse and install Perks and Icon
          sets with the click of a button!
        </p>

        <h3>Tutorial</h3>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/PBIHgcy8SLI" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

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
      </HomeWrapper>
    );
  }
}
