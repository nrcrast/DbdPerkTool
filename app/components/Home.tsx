import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';
import DeadByDaylight from '../steam/DeadByDaylight';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import { shell } from 'electron';

type MyProps = {};
type MyState = { installPath: string };

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1 className="text-center">Dead By Daylight Icon Toolbox</h1>
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
        You can get help at the Dead By Daylight Perk{' '}
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
    </div>
  );
}
