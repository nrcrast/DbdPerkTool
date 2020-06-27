import React, { Component } from 'react';
import PortraitPack from './PortraitPack';
import PackDisplay from './PackDisplay';

type MyProps = {};
type MyState = {

};

export default class Dbd extends Component<MyProps, MyState> {
  constructor(params: {}) {
    super(params);
    this.state = {
    };
  }

  fromPacksBuildCards(packs, opts) {
    return packs.map((pack) => {
      return (
        <PortraitPack
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
        packQuery={{ hasPortraits: true }}
        cardBuilder={this.fromPacksBuildCards}
        installedPackSettingsKey="installedPortraitPack"
      />
    );
  }
}
