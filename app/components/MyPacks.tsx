import React, { Component, useContext } from 'react';
import {subject} from '@casl/ability';
import PerkPack from './PerkPack';
import PortraitPack from './PortraitPack';
import PackDisplay from './PackDisplay';
import UserContext from '../context/UserContext';
import NoAuthorProfile from './NoAuthorProfile';

type MyProps = {};
type MyState = {};

export default function MyPacks() {
  const userContext = useContext(UserContext);

  const userAuthorProfile = userContext.user.authorProfile;

  if (!userAuthorProfile) {
    return <NoAuthorProfile/>
  } else {
    return (
      <PackDisplay mine={true} />
    );
  }
}
