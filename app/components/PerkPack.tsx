import React, { Component, useState } from 'react';
import axios from 'axios';
import fs from 'fs-extra';
import tmp from 'tmp';
import path from 'path';
import unzipper from 'unzipper';
import log from 'electron-log';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Accordion from 'react-bootstrap/Accordion';
import PerkPackMeta from './PerkPack/PerkPackMeta';
import PerkPackHas from './PerkPack/PerkPackHas';
import PerkPackDetails from './PerkPack/PerkPackDetails';
import PerkPackInstallOptionsModal from './PerkPackInstallOptionsModal';
import settingsUtil from '../settings/Settings';

axios.defaults.adapter = require('axios/lib/adapters/http');

type MyProps = {
  id: string;
  installed: boolean;
  downloads: number;
  meta: any;
  onAuthorClick: any;
  onError: any;
  onInstallComplete: any;
};
type MyState = {
  installed: boolean;
  saving: boolean;
  isExpanded: boolean;
  saveProgress: number;
  showInstallOpts: boolean;
};

export default class PerkPack extends Component<MyProps, MyState> {
  constructor(params: MyProps) {
    super(params);
    this.state = {
      installed: false,
      saving: false,
      saveProgress: 0,
      isExpanded: false,
      showInstallOpts: false
    };
  }

  installProgressCb(progress: number) {
    this.setState({ saveProgress: progress });
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
        log.info(response.data.length);
        log.info(tmpFile.name);
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

  async copyIconFiles(baseDir, targetDir, opts) {
    if (!opts.installPortraits) {
      log.info('Not installing Portraits');
      await fs.remove(path.resolve(baseDir, 'CharPortraits'));
    }
    if (!opts.installPowers) {
      log.info('Not installing Powers');
      await fs.remove(path.resolve(baseDir, 'Powers'));
    }
    if (!opts.installItems) {
      log.info('Not installing Items');
      await fs.remove(path.resolve(baseDir, 'Items'));
      await fs.remove(path.resolve(baseDir, 'ItemAddons'));
    }
    if (!opts.installStatus) {
      log.info('Not installing Status Effects');
      await fs.remove(path.resolve(baseDir, 'StatusEffects'));
    }

    if (!opts.installMisc) {
      const dirs = await fs.readdir(baseDir, { withFileTypes: true });
      const rmDirs = dirs
        .filter(dir => {
          return (
            dir.isDirectory() &&
            ![
              'CharPortraits',
              'Perks',
              'Items',
              'ItemAddons',
              'Powers',
              'StatusEffects'
            ].includes(dir.name)
          );
        })
        .map(dir => dir.name);
      log.info('Not installing misc dirs: ', rmDirs);
      await Promise.all(
        rmDirs.map(dir => {
          return fs.remove(path.resolve(baseDir, dir));
        })
      );
    }

    const dirsToCopy = await fs.readdir(baseDir, { withFileTypes: true });
    const dirNamesToCopy = dirsToCopy
      .filter(dir => dir.isDirectory())
      .map(dir => dir.name);
    log.info('Copying dirs: ', dirNamesToCopy);
    await fs.copy(baseDir, targetDir);
  }

  async doInstall(id: string, progressCb: any, opts: any) {
    const dbdLocation = settingsUtil.settings.dbdInstallPath;
    if (dbdLocation === '') {
      this.props.onError(
        'Dead By Daylight installation not found. Please set your installation location via the Settings tab.'
      );
      return;
    }
    try {
      const url = await axios.get(
        'https://dead-by-daylight-icon-toolbox.herokuapp.com/pack',
        {
          params: {
            packId: id
          }
        }
      );
      settingsUtil.settings.installedPack = id;
      await settingsUtil.save();
      const packDir = await this.downloadPack(url.data, progress => {
        log.info(`Progresssss: ${progress}%`);
        if (progressCb) {
          progressCb(progress);
        }
      });
      log.info('Download complete: ' + packDir.name);
      const packLocation = path.resolve(
        dbdLocation,
        'DeadByDaylight',
        'Content',
        'UI',
        'Icons'
      );
      log.info(`Copying from ${packDir.name}/Pack to ${packLocation}`);
      await this.copyIconFiles(
        path.resolve(packDir.name, 'Pack'),
        packLocation,
        opts
      );
      packDir.removeCallback();
      log.info('Installation complete!');

      this.props.onInstallComplete(id);
    } catch (e) {
      this.props.onError(`Error installing pack ${id}: ${e}`);
    }
  }

  async installPack(opts) {
    log.info('Install Opts: ', opts);
    this.setState({
      saving: true,
      saveProgress: 0
    });
    await this.doInstall(this.props.id, null, opts);
    this.setState({
      saving: false,
      saveProgress: 0
    });
  }

  render() {
    const installBtn = (
      <Button
        variant={this.props.installed ? 'secondary' : 'dark'}
        onClick={() => {
          this.setState({ showInstallOpts: true });
        }}
        className="m-1"
      >
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          className="mr-2"
          hidden={!this.state.saving}
        />
        {this.props.installed ? 'Installed' : 'Install'}
      </Button>
    );

    const images = [];
    const baseUrl = `https://d43kvaebi7up3.cloudfront.net/${encodeURIComponent(
      this.props.id
    )}`;
    for (let i = 0; i < 4; i++) {
      const url = `${baseUrl}/perks_${i}.png`;
      images.push(
        <Col>
          <Image className="perk-preview-img" src={url} fluid />
        </Col>
      );
    }
    const headerImg = <Row className="flex-nowrap">{images}</Row>;
    const expandArrow = this.state.isExpanded ? (
      <i className="fas fa-arrow-up"></i>
    ) : (
      <i className="fas fa-arrow-down"></i>
    );

    return (
      <Accordion>
        <Card className="m-3 ml-0 mr-0 text-center shadow perk-card border-0">
          <Card.Body>{headerImg}</Card.Body>
          <Card.Title>{this.props.meta.name}</Card.Title>
          <Card.Body className="mb-0">
            <Row className="mb-0 mt-0">
              <Col className="col-sm">
                <p>
                  <b>Author:</b>{' '}
                  <a href="#" onClick={this.props.onAuthorClick}>
                    {this.props.meta.author}
                  </a>
                </p>
              </Col>
              <Col className="col-sm">
                <p>
                  <b>Downloads:</b> {this.props.meta.downloads}
                </p>
              </Col>
            </Row>

            <PerkPackHas
              portraits={this.props.meta.hasPortraits}
              powers={this.props.meta.hasPowers}
              items={this.props.meta.hasItems}
              statusEffects={this.props.meta.hasStatusEffects}
            />
          </Card.Body>
          {installBtn}
          <Card.Header>
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey="0"
              className="perk-pack-expand-btn"
              onClick={e => {
                this.setState({
                  isExpanded: !this.state.isExpanded
                });
              }}
            >
              Details {expandArrow}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <PerkPackDetails
              baseUrl={baseUrl}
              meta={this.props.meta}
              downloads={this.props.downloads}
              onAuthorClick={this.props.onAuthorClick}
            />
          </Accordion.Collapse>
        </Card>
        <PerkPackInstallOptionsModal
          show={this.state.showInstallOpts}
          onConfirm={opts => {
            log.info('OPTS: ', opts);
            this.setState({ showInstallOpts: false });
            this.installPack(opts);
          }}
          onHide={() => this.setState({ showInstallOpts: false })}
          meta={this.props.meta}
        />
      </Accordion>
    );
  }
}
