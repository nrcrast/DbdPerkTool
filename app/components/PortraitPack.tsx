import React, { Component, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';

type MyProps = {
  id: string;
  installed: boolean;
  downloads: number;
  installPack: any;
  setFilter: any;
  meta: any;
  onAuthorClick: any;
};
type MyState = {
  installed: boolean;
  saving: boolean;
  isExpanded: boolean;
  saveProgress: number;
};

export default class PortraitPack extends Component<MyProps, MyState> {
  constructor(params: MyProps) {
    super(params);
    this.state = {
      installed: false,
      saving: false,
      isExpanded: false,
      saveProgress: 0
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
    const baseUrl = `https://d43kvaebi7up3.cloudfront.net/${encodeURIComponent(
      this.props.id
    )}`;
    for (let i = 0; i < 4; i++) {
      const url = `${baseUrl}/portraits_${i}.png`;
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
        {installBtn}
      </Card>
    );
  }
}
