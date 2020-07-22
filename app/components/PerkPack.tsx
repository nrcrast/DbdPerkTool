import React, { Component, useState } from 'react';
import log from 'electron-log';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Has from './IconPack/PerkPack/Has';
import Details from './IconPack/PerkPack/Details';
import InstallOptionsModal from './IconPack/PerkPack/InstallOptionsModal';
import InstallButton from './IconPack/InstallButton';
import PerkPackModel from '../models/PerkPack';
import PackMetaMapper from '../models/PackMetaMapper';
import Author from './IconPack/Author';
import LatestChapter from './IconPack/LatestChapter';
import MainPreview from './IconPack/MainPreview';
import Title from './IconPack/Title';

type MyProps = {
  id: string;
  installed: boolean;
  downloads: number;
  meta: any;
  onAuthorClick: any;
  setFilter: any;
  onError: any;
  onInstallComplete: any;
  viewMode: string;
};
type MyState = {
  saving: boolean;
  isExpanded: boolean;
  saveProgress: number;
  showInstallOpts: boolean;
  showDetails: boolean;
};

export default class PerkPack extends Component<MyProps, MyState> {
  constructor(params: MyProps) {
    super(params);
    this.state = {
      saving: false,
      saveProgress: 0,
      isExpanded: false,
      showInstallOpts: false,
      showDetails: false
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

  async installPack(opts: Array<string>) {
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
          addons={this.props.meta.hasItemAddOns}
          offerings={this.props.meta.hasFavors}
        />
      </Card.Body>
    );

    if (this.props.viewMode === 'Compact') {
      cardBody = (
        <Card.Body>
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

    const margin = this.props.viewMode === 'Normal' ? 'm-3' : 'mb-3';
    const featured = this.props.meta.featured ? 'pack-featured' : '';
    return (
      <div>
        <Card
          className={`${margin} ${featured} ml-0 mr-0 text-center shadow perk-card border-0`}
        >
          <Card.Body>
            <MainPreview
              urls={urls}
              id={this.props.id}
              baseUrl={this.props.meta.previewDir}
              viewMode={this.props.viewMode}
            />
          </Card.Body>
          <Title
            name={this.props.meta.name}
            isFeatured={this.props.meta.featured}
          />
          {cardBody}
          <InstallButton
            installed={this.props.installed}
            installInProgress={this.state.saving}
            onClick={() => {
              this.setState({ showInstallOpts: true });
            }}
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
        </Card>
        <Details
          show={this.state.showDetails}
          onHide={() => this.setState({ showDetails: false })}
          id={this.props.id}
          meta={this.props.meta}
        />
        <InstallOptionsModal
          show={this.state.showInstallOpts}
          onConfirm={(opts: Array<string>) => {
            this.setState({ showInstallOpts: false });
            this.installPack(opts);
          }}
          onHide={() => this.setState({ showInstallOpts: false })}
          meta={this.props.meta}
        />
      </div>
    );
  }
}
