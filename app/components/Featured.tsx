import React, { Component, useContext } from 'react';
import { subject } from '@casl/ability';
import PerkPack from './PerkPack';
import PortraitPack from './PortraitPack';
import PackDisplay from './PackDisplay';
import UserContext from '../context/UserContext';
import NoAuthorProfile from './NoAuthorProfile';

type MyProps = {};
type MyState = {};

export default function Featured() {
  const userContext = useContext(UserContext);

  const fromPacksBuildCards = (packs, opts) => {
    const myPacks = packs.filter(
      pack =>
        pack.id !== 'Dead-By-Daylight-Default-Icons' && pack.featured === true
    );

    return myPacks.map(pack => {
      if (pack.hasPerks) {
        return (
          <PerkPack
            viewMode={opts.viewMode}
            onError={opts.onError}
            onInstallComplete={opts.onInstallComplete}
            meta={pack}
            id={pack.id}
            downloads={pack.downloads}
            setFilter={opts.onSetFilter}
            onAuthorClick={(author: string) => {
              opts.onAuthorClick(author);
            }}
          />
        );
      } else {
        return (
          <PortraitPack
            viewMode={opts.viewMode}
            onError={opts.onError}
            onInstallComplete={opts.onInstallComplete}
            meta={pack}
            id={pack.id}
            downloads={pack.downloads}
            setFilter={opts.onSetFilter}
            onAuthorClick={(author: string) => {
              opts.onAuthorClick(author);
            }}
          />
        );
      }
    });
  };
  const portraitOnlyPacks = userContext.portraits.filter(
    pack => pack.hasPerks === false
  );
  const combinedPacks = [...userContext.packs, ...portraitOnlyPacks];

  return (
    <PackDisplay packs={combinedPacks} cardBuilder={fromPacksBuildCards} />
  );
}
