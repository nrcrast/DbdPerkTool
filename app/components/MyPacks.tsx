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

  const fromPacksBuildCards = (packs, opts) => {
    const myPacks = packs
    .filter(
      pack =>
        userContext.user.abilities.can('manage', subject('PerkPack', pack))
    );
    console.log(myPacks);
    return myPacks
      .map(pack => {
        if(pack.hasPerks) {
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

  if (!userAuthorProfile) {
    return <NoAuthorProfile/>
  } else {
    const portraitOnlyPacks = userContext.portraits.filter(pack => pack.hasPerks === false);
    const combinedPacks = [
      ...userContext.packs,
      ...portraitOnlyPacks
    ];
    console.log(combinedPacks);
    return (
      <PackDisplay packs={combinedPacks} cardBuilder={fromPacksBuildCards} />
    );
  }
}
