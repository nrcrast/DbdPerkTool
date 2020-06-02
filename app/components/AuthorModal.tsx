import React, { Component, useState } from 'react';
import { shell } from 'electron';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

type MyProps = { author: String; show: boolean; onHide: any; onShowPacks: any };
type MyState = { authorData: any };

export default class AuthorModal extends Component<MyProps, MyState> {
  constructor(params: {}) {
    super(params);
    this.state = { authorData: { links: [] } };
  }

  async componentDidUpdate(prevProps) {
    if (this.props.author !== prevProps.author) {
      try {
        const resp = await axios.get(
          'https://dead-by-daylight-icon-toolbox.herokuapp.com/author',
          {
            params: {
              author: this.props.author
            }
          }
        );
        this.setState({ authorData: resp.data });
      } catch (err) {
        this.setState({
          authorData: undefined
        });
      }
    }
  }
  openLink(e: any) {
    e.preventDefault();
    let link = e.target.href;
    shell.openExternal(link);
  }

  render() {
    const viewPacksButton = (
      <Button variant="secondary" onClick={this.props.onShowPacks}>
        View Packs
      </Button>
    );

    let body = (
      <Modal.Body>
        <h4>No profile set!</h4> {viewPacksButton}
      </Modal.Body>
    );

    if (this.state.authorData) {
      let links = undefined;
      if (
        this.state.authorData.links &&
        this.state.authorData.links.length > 0
      ) {
        const linkList = this.state.authorData.links.map(linkData => {
          return (
            <ListGroup.Item>
              <a href={linkData.link} onClick={this.openLink}>
                {linkData.label}
              </a>
            </ListGroup.Item>
          );
        });

        links = (
          <div>
            <h4 className="mt-4">Links</h4> <ListGroup>{linkList}</ListGroup>
          </div>
        );
      }

      let donateButton = undefined;
      if (this.state.authorData.donateLink) {
        donateButton = (
          <Button
            variant="secondary"
            href={this.state.authorData.donateLink}
            onClick={this.openLink}
          >
            Donate
          </Button>
        );
      }

      let footer = undefined;

      if (donateButton) {
        footer = (
          <Row className="mt-4">
            <Col>{donateButton}</Col>
            <Col className="d-flex justify-content-end">{viewPacksButton}</Col>
          </Row>
        );
      } else {
        footer = <div className="mt-4">viewPacksButton</div>;
      }

      body = (
        <Modal.Body>
          <small>{this.state.authorData.blurb}</small>
          {links}
          {footer}
        </Modal.Body>
      );
    }

    return (
      <Modal
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        onHide={this.props.onHide}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.author}
          </Modal.Title>
        </Modal.Header>
        {body}
      </Modal>
    );
  }
}
