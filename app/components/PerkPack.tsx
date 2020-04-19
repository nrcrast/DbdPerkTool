import React, { Component, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
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
};
type MyState = { installed: boolean };

export default class PerkPack extends Component<MyProps, MyState> {
  constructor(params: MyProps) {
    super(params);
  }

  async installPack() {
    return this.props.installPack(this.props.id);
  }

  render() {
    let installBtn;

    if (this.props.installed) {
      installBtn = (
        <Button variant="secondary" disabled>
          Installed
        </Button>
      );
    } else {
      installBtn = (
        <Button variant="primary" onClick={this.installPack.bind(this)}>
          Install
        </Button>
      );
    }

    return (
      <Card className="mb-3 text-center shadow perk-card border-0">
        <Card.Img variant="top" src={this.props.headerImg} />

        <Card.Title>{this.props.meta.name}</Card.Title>

        <Card.Text>
          <i>Some quick example text to build on the card title and make up the
          bulk of the card's content.</i>
        </Card.Text>
        <PerkPackMeta
          latestChapter={this.props.meta.latestChapter}
          author={this.props.meta.author}
          downloads={this.props.downloads}
          popularity={this.props.popularity}
        />
        <PerkPackHas
          portraits={this.props.meta.hasPortraits}
          powers={this.props.meta.hasPowers}
          items={this.props.meta.hasItems}
          statusEffects={this.props.meta.hasStatusEffects}
        />
        <Card.Body>{installBtn}</Card.Body>
      </Card>
    );
  }
}
