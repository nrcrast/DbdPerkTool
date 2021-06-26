import React, { Component, useContext } from 'react';
import PerkPack from './PerkPack';
import PackDisplay from './PackDisplay';
import UserContext from '../context/UserContext';

type MyProps = {};
type MyState = {};

export default function DefaultPerks() {
  return (
    <PackDisplay
      paginate={false}
      showHeaderBar={false}
      defaultOnly={true}
    />
  );
}
