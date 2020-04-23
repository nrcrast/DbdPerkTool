import React, { Component, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Accordion from 'react-bootstrap/Accordion';
import PerkPackMeta from './PerkPack/PerkPackMeta';
import PerkPackHas from './PerkPack/PerkPackHas';

type MyProps = {
  headerImg: string;
  id: string;
  installed: boolean;
  downloads: number;
  popularity: string;
  installPack: any;
  meta: any;
  onAuthorClick: any;
};
type MyState = { installed: boolean; saving: boolean; isExpanded: boolean };

export default class PerkPack extends Component<MyProps, MyState> {
  constructor(params: MyProps) {
    super(params);
    this.state = {
      installed: false,
      saving: false,
      isExpanded: false
    };
  }

  async installPack() {
    this.setState({
      saving: true
    });
    await this.props.installPack(this.props.id, this.props.meta.packZip);
    this.setState({
      saving: false
    });
  }

  render() {
    let installBtn;

    if (this.props.installed) {
      installBtn = (
        <Button variant="dark" disabled>
          Installed
        </Button>
      );
    } else {
      installBtn = (
        <Button
          variant="dark"
          onClick={this.installPack.bind(this)}
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
          Install
        </Button>
      );
    }

    const imgSrc = this.props.headerImg;

    const expandArrow = this.state.isExpanded ? <i className="fas fa-arrow-up"></i> : <i className="fas fa-arrow-down"></i>;

    return (
      <Accordion>
        <Card className="m-3 ml-0 mr-0 text-center shadow perk-card border-0">
          <Card.Img
            variant="top"
            src={imgSrc}
            className="perk-header-img text-center"
          />

          <Card.Title>{this.props.meta.name}</Card.Title>
          <Card.Text className="mb-0">
            <Row className="mb-0 mt-0">
              <Col className="col-sm">
                <p>
                  <b>Author:</b> {this.props.meta.author}
                </p>
              </Col>
              <Col className="col-sm">
                <p>
                  <b>Popularity:</b> {this.props.popularity}
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
          </Card.Text>
          {installBtn}
          <Card.Header>
            <Accordion.Toggle
              as={Button}
              variant="link"
              eventKey="0"
              className="perk-pack-expand-btn"
              onClick={(e) => {
                this.setState({
                  isExpanded: !this.state.isExpanded
                });
              }}
            >
              Details {expandArrow}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <div className="m-2">
              <Card.Text>
                <i>{this.props.meta.description}</i>
              </Card.Text>
              <PerkPackMeta
                latestChapter={this.props.meta.latestChapter}
                author={this.props.meta.author}
                downloads={this.props.downloads}
                popularity={this.props.popularity}
                onAuthorClick={this.props.onAuthorClick}
              />
            </div>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    );
  }
}
