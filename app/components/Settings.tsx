import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import settingsUtil from '../settings/Settings';
import { settings } from 'cluster';

type MyProps = {};
type MyState = { settings: Object };

export default class Settings extends Component<MyProps, MyState> {
  constructor(params: MyProps) {
    super(params);
    this.state = {
      settings: {}
    };
  }

  async syncSettings() {
    this.setState({
      settings: settingsUtil.settings
    });
  }

  async componentDidMount() {
    await settingsUtil.read();
    return this.syncSettings();
  }

  async doSave(e) {
    e.preventDefault();
    console.log(this);
    settingsUtil.settings.dbdInstallPath = this.state.settings.dbdInstallPath;
    return settingsUtil.save();
  }

  handleDbdPathChanged() {
    this.setState({
      settings: {
        dbdInstallPath: event.target.value
      }
    });
  }

  async setDefaultSettings() {
    await settingsUtil.setDefaultSettings();
    await this.syncSettings();
  }

  render() {
    const { installPath } = this.state;
    return (
      <Col className="col-4">
        <Form onSubmit={this.doSave.bind(this)}>
          <Form.Group controlId="settingsForm.dbdInstallPath">
            <Form.Label>Dead By Daylight Install Path</Form.Label>
            <Form.Control
              type="text"
              defaultValue={this.state.settings.dbdInstallPath}
              onChange={this.handleDbdPathChanged.bind(this)}
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            Save
          </Button>
          <Button
            variant="dark"
            className="float-right"
            onClick={this.setDefaultSettings.bind(this)}
          >
            Default
          </Button>
        </Form>
      </Col>
    );
  }
}
