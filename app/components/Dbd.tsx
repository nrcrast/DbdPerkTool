import React, { Component } from 'react';
import settingsUtil from '../settings/Settings';
import PerkPack from './PerkPack';
import fs from 'fs-extra';
import tmp from 'tmp';
import path from 'path';
import Progress from 'node-fetch-progress';
import fetch from 'node-fetch';
import axios from 'axios';

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

  async downloadPack(url: string, onProgress: Function) {
    // const writer = Fs.createWriteStream(path)

    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
      onDownloadProgress: progressEvent => {
        onProgress(
          Math.floor((progressEvent.loaded / progressEvent.total) * 100)
        );
      }
    });

    return new Promise((resolve, reject) => {
      const file = tmp.fileSync({ keep: true });
      fs.writeFile(file.name, response.data, err => {
        if (err) {
          reject();
        } else {
          resolve();
        }
      });
    });

    // response.data.pipe(writer)

    // return new Promise((resolve, reject) => {
    //   writer.on('finish', resolve)
    //   writer.on('error', reject)
    // })
  }

  async installPack(id: string) {
    settingsUtil.settings.installedPack = id;
    await settingsUtil.save();
    await this.downloadPack(
      'https://developer.atmosphereiot.com/files/clientAgent/atmosphereiotagent-latest%20Setup.exe',
      progress => {
        console.log(`Progress: ${progress}%`);
      }
    );
    console.log('Download complete');
    //await fs.copy();

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
    const meta = {
      name: 'nicks hot pack',
      author: 'ksdopsdkf',
      latestChapter: 'Chapter XIII: Stranger Things',
      hasPortraits: true,
      hasPowers: false,
      hasItems: true,
      hasStatusEffects: true
    };
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
            installPack={this.installPack.bind(this)}
            meta={meta}
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
