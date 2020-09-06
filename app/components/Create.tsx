import React, { Component, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import PackDir from '../packdir/PackDir';
import PackGenerator from '../packgenerator/PackGenerator';
import PlainTextInput from './Form/PlainTextInput';
import ErrorModal from './ErrorModal';
import SuccessModal from './SuccessModal';
import log from 'electron-log';
import axios from 'axios';
import PackMeta from '../models/PackMeta';
import settingsUtil from '../settings/Settings';

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
  isNsfw: boolean;
  successText: string;
  packs: Array<PackMeta>;
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
      isNsfw: false,
      description: '',
      errorText: '',
      successText: '',
      packs: []
    };
  }

  async doCreate(e) {
    e.preventDefault();
    const packDir = new PackDir(this.state.packDir);

    log.info(this.state);

    const validationStatus = await packDir.validate();

    if (validationStatus.isValid === false) {
      this.setState({
        errorModalShow: true,
        errorText: validationStatus.failReason
      });
      return;
    }

    log.info(`Contents: `, await packDir.getMeta());

    this.setState({
      saving: true
    });

    const generator = new PackGenerator(
      packDir,
      undefined,
      this.state.title,
      this.state.author,
      this.state.description,
      this.state.isNsfw,
      validationStatus.skipFiles
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

  async componentDidMount() {
    const packs = await axios.get(
      `${settingsUtil.get('targetServer')}/packs?all=true`,
    );
    this.setState({ packs: packs.data });
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

  handlePackDirChanged(event: any) {
    this.setState({
      packDir: event.target.value
    });
  }

  handleNsfwChanged(event: any) {
    this.setState({
      isNsfw: event.target.checked
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
          <PlainTextInput
            label="Title"
            onChange={(selected: any) => {
              const data = selected[0] || '';
              const packName = data.label || data;
              const targetPack: PackMeta = this.state.packs.find(
                pack => pack.name === packName
              );

              console.log(targetPack);

              if (targetPack) {
                this.setState({
                  title: packName,
                  description: targetPack.description,
                  author: targetPack.author,
                  email: targetPack.email
                });
              } else {
                this.setState({ title: packName });
              }
            }}
            options={this.state.packs.map(pack => pack.name).sort()}
          />
          <PlainTextInput
            label="Description"
            onChange={e => {
              this.setState({ description: e.target.value });
            }}
            value={this.state.description}
          />
          <PlainTextInput
            label="Author"
            onChange={e => {
              this.setState({ author: e.target.value });
            }}
            value={this.state.author}
          />
          <PlainTextInput
            label="Email"
            onChange={e => {
              this.setState({ email: e.target.value });
            }}
            value={this.state.email}
          />
          <Form.Group>
            <Form.Check
              type="checkbox"
              label="NSFW"
              checked={this.state.isNsfw}
              onChange={this.handleNsfwChanged.bind(this)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Row>
              <Form.Label column sm="5" className="field-label-text">
                Pack Directory Location
              </Form.Label>
            </Form.Row>
            <Form.Row>
              <Col sm="10">
                <Form.Control
                  type="plaintext"
                  value={this.state.packDir}
                  className="dbd-input-field"
                  onChange={this.handlePackDirChanged.bind(this)}
                />
              </Col>
              <Col>
                <Button variant="dark" onClick={this.pickPackDir.bind(this)}>
                  Browse
                </Button>
              </Col>
            </Form.Row>
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
