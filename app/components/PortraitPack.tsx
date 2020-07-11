import React, { Component, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import PortraitPackModel from '../models/PortraitPack';
import PackMetaMapper from '../models/PackMetaMapper';
import InstallButton from './IconPack/InstallButton';
import Author from './IconPack/Author';
import LatestChapter from './IconPack/LatestChapter';
import MainPreview from './IconPack/MainPreview';

type MyProps = {
  id: string;
  installed: boolean;
  downloads: number;
  setFilter: any;
  meta: any;
  onAuthorClick: any;
  onError: any;
  onInstallComplete: any;
  viewMode: string;
};
type MyState = {
  saving: boolean;
  saveProgress: number;
};

export default class PortraitPack extends Component<MyProps, MyState> {
  constructor(params: MyProps) {
    super(params);
    this.state = {
      saving: false,
      saveProgress: 0
    };
  }

  installProgressCb(progress: number) {
    this.setState({ saveProgress: progress });
  }

  async doInstall(id: string, progressCb: any) {
    const pack = new PortraitPackModel(PackMetaMapper.fromRaw(this.props.meta));
    try {
      await pack.install(progressCb, {});
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
    const urls = [...Array(4).keys()].map(i => {
      return `portraits_${i}.png`;
    });

    let cardBody = (
      <Card.Body className="mb-0">
        <Row>
          <Col>
            <p>
              <b>Author:</b>{' '}
              <Author
                onClick={(name: string) => {
                  this.props.onAuthorClick(name);
                }}
                name={this.props.meta.author}
              />
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
            <b>Latest Chapter:</b>{' '}
            <LatestChapter
              name={this.props.meta.latestChapter}
              onClick={() => {
                this.props.setFilter(this.props.meta.latestChapter);
              }}
            />
          </Col>
        </Row>
      </Card.Body>
    );

    if (this.props.viewMode === 'Compact') {
      cardBody = (
        <Card.Body className="mb-0">
          <b>Author:</b>{' '}
          <Author
            onClick={(name: string) => {
              this.props.onAuthorClick(name);
            }}
            name={this.props.meta.author}
          />
          <br/>
          <b>Latest Chapter:</b>{' '}
          <LatestChapter
            name={this.props.meta.latestChapter}
            onClick={() => {
              this.props.setFilter(this.props.meta.latestChapter);
            }}
          />
        </Card.Body>
      );
    }

    return (
      <Card className="m-3 ml-0 mr-0 text-center shadow perk-card border-0">
        <Card.Body className="p-2">
          <MainPreview
            viewMode={this.props.viewMode}
            urls={urls}
            id={this.props.id}
            baseUrl={this.props.meta.previewDir}
          />
        </Card.Body>
        <Card.Title className="mb-0">{this.props.meta.name}</Card.Title>
        {cardBody}
        <InstallButton
          installed={this.props.installed}
          installInProgress={this.state.saving}
          onClick={this.installPack.bind(this)}
        />
      </Card>
    );
  }
}
