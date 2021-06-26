import React, { Component, useContext } from 'react';
import { subject } from '@casl/ability';
import PerkPack from './PerkPack';
import PortraitPack from './PortraitPack';
import PackDisplay from './PackDisplay';
import UserContext from '../context/UserContext';
import NoAuthorProfile from './NoAuthorProfile';

type MyProps = {};
type MyState = {};

export default function Perks() {
  return (
    <PackDisplay />
  );
}
