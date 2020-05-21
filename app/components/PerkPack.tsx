import React, { Component, useState } from 'react';

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
import log from 'electron-log';

type MyProps = {
  id: string;
  installed: boolean;
  downloads: number;
  installPack: any;
  meta: any;
  onAuthorClick: any;
};
type MyState = {
  installed: boolean;
  saving: boolean;
  isExpanded: boolean;
  saveProgress: number;
};

export default class PerkPack extends Component<MyProps, MyState> {
  constructor(params: MyProps) {
    super(params);
    this.state = {
      installed: false,
      saving: false,
      saveProgress: 0,
      isExpanded: false
    };
  }

  installProgressCb(progress: number) {
    this.setState({ saveProgress: progress });
  }

  async installPack() {
    this.setState({
      saving: true,
      saveProgress: 0
    });
    await this.props.installPack(
      this.props.id,
      this.installProgressCb.bind(this)
    );
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
    const baseUrl = `https://dbd-perk-packs.s3.amazonaws.com/${encodeURIComponent(
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
                  <b>Author:</b> {this.props.meta.author}
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
      </Accordion>
    );
  }
}
