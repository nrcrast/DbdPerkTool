import React, { Component, useState } from 'react';
import log from 'electron-log';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Accordion from 'react-bootstrap/Accordion';
import Has from './IconPack/PerkPack/Has';
import Details from './IconPack/PerkPack/Details';
import InstallOptionsModal from './IconPack/PerkPack/InstallOptionsModal';
import InstallButton from './IconPack/InstallButton';
import PerkPackModel from '../models/PerkPack';
import PackMetaMapper from '../models/PackMetaMapper';
import Author from './IconPack/Author';
import LatestChapter from './IconPack/LatestChapter';
import MainPreview from './IconPack/MainPreview';

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
  saving: boolean;
  isExpanded: boolean;
  saveProgress: number;
  showInstallOpts: boolean;
};

export default class PerkPack extends Component<MyProps, MyState> {
  constructor(params: MyProps) {
    super(params);
    this.state = {
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
    const urls = [...Array(4).keys()].map(i => {
      return `perks_${i}.png`;
    });
    const expandArrow = this.state.isExpanded ? (
      <i className="fas fa-arrow-up"></i>
    ) : (
      <i className="fas fa-arrow-down"></i>
    );

    return (
      <Accordion>
        <Card className="m-3 ml-0 mr-0 text-center shadow perk-card border-0">
          <Card.Body>
            <MainPreview urls={urls} id={this.props.id} />
          </Card.Body>
          <Card.Title className="mb-0">{this.props.meta.name}</Card.Title>
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
            <Row className="mb-3">
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

            <Has
              portraits={this.props.meta.hasPortraits}
              powers={this.props.meta.hasPowers}
              items={this.props.meta.hasItems}
              statusEffects={this.props.meta.hasStatusEffects}
            />
          </Card.Body>
          <InstallButton
            installed={this.props.installed}
            installInProgress={this.state.saving}
            onClick={() => {
              this.setState({ showInstallOpts: true });
            }}
          />
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
            <Details id={this.props.id} meta={this.props.meta} />
          </Accordion.Collapse>
        </Card>
        <InstallOptionsModal
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
