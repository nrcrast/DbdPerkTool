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
import ErrorModal from './ErrorModal';
import Spinner from 'react-bootstrap/Spinner';

axios.defaults.adapter = require('axios/lib/adapters/http');

type MyProps = {};
type MyState = {
  installedPack: string;
  packs: Array<any>;
  errorModalShow: boolean;
  isLoading: boolean;
};

export default class Dbd extends Component<MyProps, MyState> {
  constructor(params: {}) {
    super(params);
    this.state = {
      installedPack: '',
      packs: [],
      errorModalShow: false,
      isLoading: true
    };
  }

  async componentDidMount() {
    // Get packs
    const packs = await axios.get('http://crast.ddns.net:1338/packs');
    const installedPack = settingsUtil.settings.installedPack || '';
    this.setState({
      installedPack,
      packs: packs.data,
      isLoading: false
    });
  }

  async downloadPack(url: string, onProgress: Function) {
    const response = await axios({
      url,
      method: 'GET',
      onDownloadProgress: progressEvent => {
        onProgress(
          Math.floor((progressEvent.loaded / progressEvent.total) * 100)
        );
      },
      responseType: 'arraybuffer'
    });

    return new Promise((resolve, reject) => {
      const tmpFile = tmp.fileSync();
      fs.writeFile(tmpFile.name, Buffer.from(response.data), err => {
        console.log(response.data.length);
        console.log(tmpFile.name);
        if (err) {
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
    const dbdLocation = settingsUtil.settings.dbdInstallPath;
    if (dbdLocation === '') {
      this.setState({
        errorModalShow: true
      });
      return;
    }
    settingsUtil.settings.installedPack = id;
    await settingsUtil.save();
    const packDir = await this.downloadPack(
      'http://crast.ddns.net:1338/packs/' + id,
      progress => {
        console.log(`Progress: ${progress}%`);
      }
    );
    console.log('Download complete: ' + packDir.name);
    const packLocation = path.resolve(
      dbdLocation,
      'DeadByDaylight',
      'Content',
      'UI',
      'Icons'
    );
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
    if (this.state.isLoading) {
      return (
        <Spinner
          as="span"
          animation="border"
          role="status"
          aria-hidden="true"
          className="mr-2"
          hidden={!this.state.isLoading}
        />
      );
    }
    const errorModalTitle = 'Error';
    const errorModalText =
      'Dead By Daylight Installation not found. Please set your installation directory in the Settings tab.';
    const cards = [];
    this.state.packs.forEach((pack, index) => {
      let installed = this.state.installedPack === pack.id;
      let popularity = `${index + 1}/${this.state.packs.length}`;
      cards.push(
        <div>
          <PerkPack
            id={pack.id}
            installPack={this.installPack.bind(this)}
            meta={pack}
            headerImg={pack.headerImg}
            installed={installed}
            downloads={pack.downloads}
            popularity={popularity}
          />
        </div>
      );
    });

    cards.push(
      <ErrorModal
        title={errorModalTitle}
        text={errorModalText}
        show={this.state.errorModalShow}
        onHide={() => this.setState({ errorModalShow: false })}
      />
    );
    return cards;
  }
}
