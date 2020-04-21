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
import { MDBContainer, MDBInputGroup, MDBBtn, MDBInput } from 'mdbreact';
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
      this.state.description
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
          className="md-form"
          onSubmit={this.doCreate.bind(this)}
          onChange={this.handleFormChanged.bind(this)}
        >
          <MDBInput
            label="Title"
            className="text-white dbd-input-field"
            labelClass="field-label-text"
            required
            onChange={e => {
              this.setState({ title: e.target.value });
            }}
          />
          <MDBInput
            label="Description"
            className="text-white dbd-input-field"
            labelClass="field-label-text"
            required
            onChange={e => {
              this.setState({ description: e.target.value });
            }}
          />
          <MDBInput
            label="Author"
            className="text-white dbd-input-field"
            labelClass="field-label-text"
            required
            onChange={e => {
              this.setState({ author: e.target.value });
            }}
          />
          <MDBInput
            label="Email Address"
            className="text-white dbd-input-field"
            labelClass="field-label-text"
            required
            onChange={e => {
              this.setState({ email: e.target.value });
            }}
          />
          <MDBInputGroup
            material
            hint="Pack Directory"
            className="text-white dbd-input-field"
            value={this.state.packDir}
            onChange={this.handlePackDirChanged.bind(this)}
            append={
              <Button variant="dark" onClick={this.pickPackDir.bind(this)}>
                Browse
              </Button>
            }
          />


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
