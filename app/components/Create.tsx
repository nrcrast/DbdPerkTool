import React, { Component, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import path from 'path';
import { default as fsWithCallbacks } from 'fs';
import ErrorModal from './ErrorModal';
import SuccessModal from './SuccessModal';
const fs = fsWithCallbacks.promises;

const { dialog } = require('electron').remote;

type MyProps = {};
type MyState = {
  unsaved: boolean;
  packDir: string;
  errorModalShow: boolean;
  successModalShow: boolean;
  title: string;
  author: string;
  email: string;
  saving: boolean;
};

export default class Create extends Component<MyProps, MyState> {
  constructor(params: MyProps) {
    super(params);
    this.state = {
      unsaved: false,
      packDir: '',
      errorModalShow: false,
      successModalShow: false,
      title: '',
      author: '',
      email: '',
      saving: false
    };
  }

  async dirExists(dir: string) {
    try {
      const stats = await fs.lstat(dir);
      return stats.isDirectory();
    } catch (e) {
      return false;
    }
  }

  async verifyPackDir() {
    const perksDirExists = await this.dirExists(
      path.resolve(this.state.packDir, 'Perks')
    );
    return perksDirExists;
  }

  async doCreate(e) {
    e.preventDefault();
    const packDirIsValid = await this.verifyPackDir();

    console.log(this.state);

    if (!packDirIsValid) {
      this.setState({
        errorModalShow: true
      });
      return;
    }

    this.setState({
      saving: true
    });

    const packSettings = {
      title: this.state.title,
      author: this.state.author,
      email: this.state.email
    };

    this.setState({
      saving: false,
      successModalShow: true
    });
  }

  async handleFormChanged() {}

  async pickPackDir() {
    const dir = await dialog.showOpenDialog({
      properties: ['openDirectory']
    });

    if (!dir.canceled && dir.filePaths.length > 0) {
      this.setState({
        packDir: dir.filePaths[0]
      });
    }
  }

  async handlePackDirChanged(event) {
    this.setState({
      packDir: event.target.value
    });
  }

  render() {
    const errorModalTitle = 'Invalid Pack Directory';
    const errorModalText =
      'This typically means you are missing the Perks directory inside your Pack directory.';
    const successModalTitle = 'Your pack has been successfully generated!';
    return (
      <Col className="col-8">
        <Form
          onSubmit={this.doCreate.bind(this)}
          onChange={this.handleFormChanged.bind(this)}
        >
          <Form.Group controlId="createForm.title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="My awesome pack"
              onChange={e => {
                this.setState({ title: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group controlId="createForm.author">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Max Thompson Jr."
              onChange={e => {
                this.setState({ author: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group controlId="createForm.email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="hillbilly@yahoo.com"
              onChange={e => {
                this.setState({ email: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group controlId="createForm.packDirectory">
            <Form.Label>Pack Directory</Form.Label>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  value={this.state.packDir}
                  onChange={this.handlePackDirChanged.bind(this)}
                />
              </Col>
              <Col>
                <Button onClick={this.pickPackDir.bind(this)}>Browse</Button>
              </Col>
            </Row>
          </Form.Group>
          <Button variant="dark" type="submit">
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="mr-2"
              hidden={!this.state.saving}
            />
            Create Pack
          </Button>
        </Form>
        <ErrorModal
          title={errorModalTitle}
          text={errorModalText}
          show={this.state.errorModalShow}
          onHide={() => this.setState({ errorModalShow: false })}
        />
        <SuccessModal
          title={successModalTitle}
          show={this.state.successModalShow}
          onHide={() => this.setState({ successModalShow: false })}
        />
      </Col>
    );
  }
}
