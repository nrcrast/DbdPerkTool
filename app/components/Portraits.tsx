import React, { Component, useContext } from 'react';
import PortraitPack from './PortraitPack';
import PackDisplay from './PackDisplay';
import UserContext from '../context/UserContext';

type MyProps = {};
type MyState = {};

export default function Perks() {
  const userContext = useContext(UserContext);

  const fromPacksBuildCards = (packs, opts) => {
    return packs
      .filter(
        pack =>
          pack.id !== 'Dead-By-Daylight-Default-Icons'
      )
      .map(pack => {
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
      });
  };

    return <PackDisplay packs={userContext.portraits} cardBuilder={fromPacksBuildCards} />;
  
}


