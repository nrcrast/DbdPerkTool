import React, { Component, useContext } from 'react';
import PerkPack from './PerkPack';
import PackDisplay from './PackDisplay';
import UserContext from '../context/UserContext';

type MyProps = {};
type MyState = {};

export default function MyPacks() {
  const userContext = useContext(UserContext);

  const userAuthorProfile = userContext.user.authorProfile || {};

  const fromPacksBuildCards = (packs, opts) => {
    return packs
      .filter(
        pack =>
          pack.id !== 'Dead-By-Daylight-Default-Icons' &&
          pack.author === userAuthorProfile.name
      )
      .map(pack => {
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
      });
  };

  const noUserProfileMsg =
    'You currently have no author profile. Please contact Sup3rStabby to connect your author profile to your account. <3';

  if (!userAuthorProfile) {
    return (
      <h3>
        {noUserProfileMsg}
      </h3>
    );
  } else {
    return <PackDisplay packQuery={{}} cardBuilder={fromPacksBuildCards} />;
  }
}
