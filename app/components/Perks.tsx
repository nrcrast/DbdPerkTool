import React, { Component } from 'react';
import PerkPack from './PerkPack';
import PackDisplay from './PackDisplay';

type MyProps = {};
type MyState = {};

export default class Perks extends Component<MyProps, MyState> {
  constructor(params: {}) {
    super(params);
    this.state = {};
  }

  fromPacksBuildCards(packs, opts) {
    return packs.map(pack => {
      return (
        <PerkPack
          viewMode={opts.viewMode}
          onError={opts.onError}
          onInstallComplete={opts.onInstallComplete}
          meta={pack}
          id={pack.id}
          installed={pack.isInstalled}
          downloads={pack.downloads}
          setFilter={opts.onSetFilter}
          onAuthorClick={(author: string) => {
            opts.onAuthorClick(author);
          }}
        />
      );
    });
  }

  render() {
    return (
      <PackDisplay
        packQuery={{}}
        cardBuilder={this.fromPacksBuildCards}
        installedPackSettingsKey="installedPack"
      />
    );
  }
}
