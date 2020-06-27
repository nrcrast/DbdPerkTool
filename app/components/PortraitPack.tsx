import React, { Component, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import PortraitPackModel from '../models/PortraitPack';
import PackMetaMapper from '../models/PackMetaMapper';
import PackInstallButton from './PackInstallButton';

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
    const images = [];
    const baseUrl = `https://d43kvaebi7up3.cloudfront.net/${encodeURIComponent(
      this.props.id
    )}`;
    for (let i = 0; i < 4; i++) {
      const url = `${baseUrl}/portraits_${i}.png`;
      images.push(
        <Col key={`portraitpack-${this.props.id}-img-${i}`}>
          <Image className="perk-preview-img" src={url} fluid />
        </Col>
      );
    }
    const headerImg = <Row className="flex-nowrap">{images}</Row>;

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
        <PackInstallButton
          installed={this.props.installed}
          installInProgress={this.state.saving}
          onClick={this.installPack.bind(this)}
        />
      </Card>
    );
  }
}