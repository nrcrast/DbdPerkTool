import React, { Component, useState } from 'react';
import log from 'electron-log';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Accordion from 'react-bootstrap/Accordion';
import PerkPackHas from './PerkPack/PerkPackHas';
import PerkPackDetails from './PerkPack/PerkPackDetails';
import PerkPackInstallOptionsModal from './PerkPackInstallOptionsModal';
import PerkPackModel from '../models/PerkPack';
import PackMetaMapper from '../models/PackMetaMapper';

type MyProps = {
  id: string;
  installed: boolean;
  downloads: number;
  meta: any;
  onAuthorClick: any;
  setFilter: any;
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

  async doInstall(id: string, progressCb: any, opts: any) {
    const pack = new PerkPackModel(PackMetaMapper.fromRaw(this.props.meta));
    try {
      await pack.install(progressCb, opts);
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
      <Accordion>
        <Card className="m-3 ml-0 mr-0 text-center shadow perk-card border-0">
          <Card.Body>{headerImg}</Card.Body>
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
            <Row className="mb-3">
              <Col>
                <b>Latest Chapter:</b> {latestChapterLink}
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
            <PerkPackDetails baseUrl={baseUrl} meta={this.props.meta} />
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
