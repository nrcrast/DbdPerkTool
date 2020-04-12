import React, { Component } from 'react';
import settingsUtil from '../settings/Settings';
import PerkPack from './PerkPack';

type MyProps = {};
type MyState = { installedPack: string };

export default class Dbd extends Component<MyProps, MyState> {
  constructor(params: {}) {
    super(params);
    this.state = {
      installedPack: ''
    };
  }

  async componentDidMount() {
    const installedPack = settingsUtil.settings.installedPack || '';
    this.setState({
      installedPack
    });
  }

  async installPack(id: string) {
    settingsUtil.settings.installedPack = id;
    await settingsUtil.save();
    this.setState({
      installedPack: id
    });
  }

  chunkArray(myArray: Array<any>, chunkSize: number) {
    const arrayLength = myArray.length;
    const tempArray = [];

    for (let index = 0; index < arrayLength; index += chunkSize) {
      const myChunk = myArray.slice(index, index + chunkSize);
      // Do something if you want with the group
      tempArray.push(myChunk);
    }

    return tempArray;
  }

  render() {
    const cards = [];
    for (let i = 0; i < 20; i++) {
      let id = `perk_pack_${i}`;
      let installed = false;
      if (id === this.state.installedPack) {
        installed = true;
      }

      cards.push(
        <div>
          <PerkPack
            id={id}
            name="Nick's Pack"
            installPack={this.installPack.bind(this)}
            author="Nick"
            headerImg="./img/testperk-lg.png"
            installed={installed}
            downloads={1234}
            popularity="44/1234"
          />
        </div>
      );
    }
    return cards;
  }
}
