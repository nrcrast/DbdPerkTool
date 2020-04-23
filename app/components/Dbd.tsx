import React, { Component } from 'react';
import settingsUtil from '../settings/Settings';
import PerkPack from './PerkPack';
import fs from 'fs-extra';
import tmp from 'tmp';
import path from 'path';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import unzipper from 'unzipper';
import axios from 'axios';
import ErrorModal from './ErrorModal';
import Spinner from 'react-bootstrap/Spinner';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import DropdownButton from 'react-bootstrap/DropdownButton';
import logger from 'electron-log';

axios.defaults.adapter = require('axios/lib/adapters/http');

type MyProps = {};
type MyState = {
  installedPack: string;
  packs: Array<any>;
  errorModalShow: boolean;
  isLoading: boolean;
  searchFilter: string;
  sortKey: string;
};

export default class Dbd extends Component<MyProps, MyState> {
  constructor(params: {}) {
    super(params);
    this.state = {
      installedPack: '',
      packs: [],
      errorModalShow: false,
      isLoading: true,
      searchFilter: '',
      sortKey: 'Popularity'
    };
  }

  async componentDidMount() {
    // Get packs
    const packs = await axios.get('https://dead-by-daylight-icon-toolbox.herokuapp.com/packs');
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
        logger.info(response.data.length);
        logger.info(tmpFile.name);
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

  async installPack(id:string, url: string) {
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
      url,
      progress => {
        logger.info(`Progress: ${progress}%`);
      }
    );
    logger.info('Download complete: ' + packDir.name);
    const packLocation = path.resolve(
      dbdLocation,
      'DeadByDaylight',
      'Content',
      'UI',
      'Icons'
    );
    logger.info(`Copying fro ${packDir.name}/Pack to ${packLocation}`);
    await fs.copy(path.resolve(packDir.name, 'Pack'), packLocation);
    packDir.removeCallback();
    logger.info('Installation complete!');

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

  searchFilter(text: string) {
    return text.search(new RegExp(this.state.searchFilter, 'i')) >= 0;
  }

  isPackIncluded(pack) {
    if (this.state.searchFilter === '') {
      return true;
    } else if (
      this.searchFilter(pack.name) ||
      this.searchFilter(pack.author) ||
      this.searchFilter(pack.description) ||
      this.searchFilter(pack.latestChapter)
    ) {
      return true;
    }
    return false;
  }

  strcmpIgnoreCase(a, b) {
    return a.toUpperCase().localeCompare(b.toUpperCase());
  }

  packSortComparator(a, b) {
    const key = this.state.sortKey;

    if (key === 'Name') {
      return this.strcmpIgnoreCase(a.name, b.name);
    } else if (key === 'Author') {
      return this.strcmpIgnoreCase(a.author, b.author);
    } else if (key === 'Popularity') {
      return a.downloads > b.downloads;
    }

    const aDate = new Date(a.createdAt);
    const bDate = new Date(b.createdAt);
    return aDate > bDate ? -1 : aDate < bDate ? 1 : 0;
  }

  fromPacksBuildCards(packs) {
    return packs
      .filter(pack => this.isPackIncluded(pack))
      .map((pack, index) => {
        let installed = this.state.installedPack === pack.id;
        let popularity = `${index + 1}/${this.state.packs.length}`;
        return (
          <PerkPack
            id={pack.id}
            installPack={this.installPack.bind(this)}
            meta={pack}
            headerImg={pack.headerImg}
            installed={installed}
            downloads={pack.downloads}
            popularity={popularity}
            onAuthorClick={e => {
              e.preventDefault();
              this.setState({ searchFilter: pack.author });
            }}
          />
        );
      });
  }

  fromCardsBuildDeck(cards) {
    const decks = [];
    for (let i = 0; i < cards.length; i += 2) {
      if (i + 1 >= cards.length) {
        decks.push(<Row >{cards[i]}</Row>);
      } else {
        decks.push(
          <Row>
            <Col class='col-sm'>
            {cards[i]}
            </Col>
            <Col class='col-sm'>
            {cards[i + 1]}
            </Col>
            
          </Row>
        );
      }
    }

    return decks;
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

    let packs = [...this.state.packs];
    packs.sort(this.packSortComparator.bind(this));
    const cards = this.fromPacksBuildCards(packs);
    const deck = this.fromCardsBuildDeck(cards);

    return (
      <div>
        <Form.Group>
          <Form.Row className="justify-content-center">
            <Col>
              <DropdownButton
                variant="dark"
                id="sortDropDown"
                title={
                  <span>
                    <i className="fas fa-sort-amount-down"></i> Sort (
                    {this.state.sortKey})
                  </span>
                }
              >
                <NavDropdown.Item
                  className="field-label-text"
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ sortKey: 'Name' });
                  }}
                >
                  Name (A-Z)
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="field-label-text"
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ sortKey: 'Popularity' });
                  }}
                >
                  Popularity
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="field-label-text"
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ sortKey: 'Author' });
                  }}
                >
                  Author (A-Z)
                </NavDropdown.Item>
                <NavDropdown.Item
                  className="field-label-text"
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    this.setState({ sortKey: 'Date' });
                  }}
                >
                  Date (newest first)
                </NavDropdown.Item>
              </DropdownButton>
            </Col>
            <Col>
              <Form.Control
                type="text"
                placeholder="Search"
                className="mr-sm-2 dbd-input-field"
                onChange={e => {
                  this.setState({ searchFilter: e.target.value });
                }}
                value={this.state.searchFilter}
              />
            </Col>
          </Form.Row>
        </Form.Group>
        {deck}
        <ErrorModal
          title={errorModalTitle}
          text={errorModalText}
          show={this.state.errorModalShow}
          onHide={() => this.setState({ errorModalShow: false })}
        />
      </div>
    );
  }
}
