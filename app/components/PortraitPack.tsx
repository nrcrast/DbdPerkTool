import React, { Component, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import settingsUtil from '../settings/Settings';
import log from 'electron-log';
import axios from 'axios';
import fs from 'fs-extra';
import tmp from 'tmp';
import path from 'path';
import unzipper from 'unzipper';

type MyProps = {
  id: string;
  installed: boolean;
  downloads: number;
  setFilter: any;
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
};

export default class PortraitPack extends Component<MyProps, MyState> {
  constructor(params: MyProps) {
    super(params);
    this.state = {
      installed: false,
      saving: false,
      isExpanded: false,
      saveProgress: 0
    };
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

  installProgressCb(progress: number) {
    this.setState({ saveProgress: progress });
  }

  async doInstall(id: string, progressCb: any) {
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
      await fs.copy(
        path.resolve(packDir.name, 'Pack', 'CharPortraits'),
        packLocation
      );
      packDir.removeCallback();
      log.info('Installation complete!');

      this.props.onInstallComplete(id);
    } catch (e) {
      this.props.onError(`Error installing pack ${id}: ${e}`);
    }
  }

  async installPack() {
    this.setState({
      saving: true,
      saveProgress: 0
    });
    await this.doInstall(this.props.id, () => {});
    this.setState({
      saving: false,
      saveProgress: 0
    });
  }

  render() {
    const installBtn = (
      <Button
        variant={this.props.installed ? 'secondary' : 'dark'}
        onClick={this.installPack.bind(this)}
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
      const url = `${baseUrl}/portraits_${i}.png`;
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

    // Author isn't a link if it's multiple
    const author =
      this.props.meta.author.indexOf('+') >= 0 ? (
        this.props.meta.author
      ) : (
        <a href="#" onClick={this.props.onAuthorClick}>
          {this.props.meta.author}
        </a>
      );

    const latestChapterLink = (
      <a
        href="#"
        onClick={e => {
          e.preventDefault();
          this.props.setFilter(this.props.meta.latestChapter);
        }}
      >
        {this.props.meta.latestChapter}
      </a>
    );

    return (
      <Card className="m-3 ml-0 mr-0 text-center shadow perk-card border-0">
        <Card.Body className="p-2">{headerImg}</Card.Body>
        <Card.Title className="mb-0">{this.props.meta.name}</Card.Title>
        <Card.Body className="mb-0">
          <Row>
            <Col>
              <p>
                <b>Author:</b> {author}
              </p>
            </Col>
            <Col>
              <p>
                <b>Downloads:</b> {this.props.meta.downloads}
              </p>
            </Col>
          </Row>
          <Row className="mb-0">
            <Col>
              <b>Latest Chapter:</b> {latestChapterLink}
            </Col>
          </Row>
        </Card.Body>
        {installBtn}
      </Card>
    );
  }
}
