import React, { Component, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import PackDir from '../packdir/PackDir';
import PackGenerator from '../packgenerator/PackGenerator';
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
  errorText: string;
  description: string;
  successText: string;
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
      saving: false,
      description: '',
      errorText: '',
      successText: ''
    };
  }

  async doCreate(e) {
    e.preventDefault();
    const packDir = new PackDir(this.state.packDir);

    console.log(this.state);

    if (!(await packDir.validate())) {
      this.setState({
        errorModalShow: true
      });
      return;
    }

    console.log(`Contents: `, await packDir.getMeta());

    this.setState({
      saving: true
    });

    const generator = new PackGenerator(
      packDir,
      undefined,
      this.state.title,
      this.state.author,
      this.state.desc
    );

    try {
      const outputZip = await generator.generate();
      this.setState({
        saving: false,
        successText: `Your pack has been generated at ${outputZip}`,
        successModalShow: true
      });
    } catch (e) {
      this.setState({
        saving: false,
        errorText: `Error generating Pack: ${e}`,
        errorModalShow: true
      });
    }
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
    const errorModalTitle = 'Error generating pack';
    const errorModalText = this.state.errorText;
    const successModalTitle = 'Success';
    return (
      <Col className="col-8">
        <Form
          onSubmit={this.doCreate.bind(this)}
          onChange={this.handleFormChanged.bind(this)}
        >
          <Form.Group controlId="createForm.title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="My awesome pack"
              onChange={e => {
                this.setState({ title: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group controlId="createForm.desc">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="This is probably the best pack around"
              onChange={e => {
                this.setState({ description: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group controlId="createForm.author">
            <Form.Label>Author</Form.Label>
            <Form.Control
              required
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
              required
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
                  required
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
          text={this.state.successText}
          show={this.state.successModalShow}
          onHide={() => this.setState({ successModalShow: false })}
        />
      </Col>
    );
  }
}
