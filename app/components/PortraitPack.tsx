import React, { Component, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import PortraitPackModel from '../models/PortraitPack';
import PackMetaMapper from '../models/PackMetaMapper';
import InstallButton from './IconPack/InstallButton';
import Author from './IconPack/Author';
import LatestChapter from './IconPack/LatestChapter';
import MainPreview from './IconPack/MainPreview';
import Title from './IconPack/Title';
import NsfwWarning from './IconPack/NsfwWarning';
import Details from './IconPack/PortraitPack/Details';
import settingsUtils from '../settings/Settings';

type MyProps = {
  id: string;
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
  showDetails: boolean;
};

export default class PortraitPack extends Component<MyProps, MyState> {
  constructor(params: MyProps) {
    super(params);
    this.state = {
      saving: false,
      saveProgress: 0,
      showDetails: false,
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
          <br />
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

    const featured = this.props.meta.featured ? 'pack-featured' : '';

    return (
      <Card
        className={`${featured} m-3 ml-0 mr-0 text-center shadow perk-card border-0`}
      >
        <Card.Body className="p-2">
          <MainPreview
            viewMode={this.props.viewMode}
            urls={urls}
            id={this.props.id}
            baseUrl={this.props.meta.previewDir}
            isNsfw={this.props.meta.isNsfw}
          />
        </Card.Body>
        <Title
          name={this.props.meta.name}
          isFeatured={this.props.meta.featured}
        />
        {this.props.meta.isNsfw && !settingsUtils.settings.showNsfw && <NsfwWarning />}
        {cardBody}
        <InstallButton
          installInProgress={this.state.saving}
          onClick={this.installPack.bind(this)}
        />
        <Button
          variant="dark"
          className="m-1"
          onClick={() => {
            this.setState({ showDetails: true });
          }}
        >
          Details
        </Button>
        <Details
          show={this.state.showDetails}
          onHide={() => this.setState({ showDetails: false })}
          id={this.props.id}
          meta={this.props.meta}
        />
      </Card>
    );
  }
}
