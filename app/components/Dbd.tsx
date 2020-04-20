import React, { Component } from 'react';
import settingsUtil from '../settings/Settings';
import PerkPack from './PerkPack';
import fs from 'fs-extra';
import tmp from 'tmp';
import path from 'path';
import Progress from 'node-fetch-progress';
import fetch from 'node-fetch';
import unzipper from 'unzipper';
import axios from 'axios';

axios.defaults.adapter = require('axios/lib/adapters/http');

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
      onDownloadProgress: (progressEvent) => {
        onProgress(Math.floor(((progressEvent.loaded / progressEvent.total) * 100)))
      },
      responseType: 'arraybuffer'
    });

    return new Promise((resolve, reject) => {
      const tmpFile = tmp.fileSync();
      fs.writeFile(tmpFile.name, Buffer.from(response.data), (err) => {
        console.log(response.data.length);
        console.log(tmpFile.name);
        if(err) {
          reject(err);
        } else {
          const tmpDir = tmp.dirSync({ keep: true });
          fs.createReadStream(tmpFile.name)
            .pipe(unzipper.Extract({ path: tmpDir.name }))
            .on('close', () => {
              resolve(tmpDir);
            })
            .on('error', e => {
              reject(e);
            });
        }
      });
    });
  }

  async installPack(id: string) {
    settingsUtil.settings.installedPack = id;
    await settingsUtil.save();
    const packDir = await this.downloadPack(
      'http://127.0.0.1:3000/testpack2.zip',
      progress => {
        console.log(`Progress: ${progress}%`);
      }
    );
    console.log('Download complete: ' + packDir.name);
    const dbdLocation = settingsUtil.settings.dbdInstallPath;
    const packLocation = path.resolve(dbdLocation, 'DeadByDaylight', 'Content', 'UI', 'Icons');
    console.log(`Copying fro ${packDir.name}/Pack to ${packLocation}`);
    await fs.copy(path.resolve(packDir.name, 'Pack'), packLocation);
    console.log('Installation complete!');

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
