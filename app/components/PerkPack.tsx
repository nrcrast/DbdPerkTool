import React, { Component, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
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
type MyState = { installed: boolean; saving: boolean };

export default class PerkPack extends Component<MyProps, MyState> {
  constructor(params: MyProps) {
    super(params);
    this.state = {
      installed: false,
      saving: false
    };
  }

  async installPack() {
    this.setState({
      saving: true
    });
    await this.props.installPack(this.props.id);
    this.setState({
      saving: false
    });
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

    const imgSrc = 'data:image/png;base64, ' + this.props.headerImg;

    return (
      <Card className="mb-3 text-center shadow perk-card border-0">
        <Card.Img variant="top" src={imgSrc} />

        <Card.Title>{this.props.meta.name}</Card.Title>

        <Card.Text>
          <i>{this.props.meta.description}</i>
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
