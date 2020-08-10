import React, { Component, useState, useEffect } from 'react';
import path from 'path';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormCheck from 'react-bootstrap/FormCheck';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import settingsUtil from '../settings/Settings';
import PlainTextInput from './Form/PlainTextInput';
import log from 'electron-log';
import { app, remote, shell } from 'electron';

type MyProps = {};

async function doSave(installPath, autoUpdate, showCreate) {
  settingsUtil.settings.dbdInstallPath = installPath;
  settingsUtil.settings.autoUpdate = autoUpdate;
  settingsUtil.settings.showCreate = showCreate;
  await settingsUtil.save();
}

function openLogs() {
  const logPath = path.resolve((app || remote.app).getPath('userData'), 'logs');
  shell.openExternal(logPath);
}

export default function Settings(props: MyProps) {
  const [installPath, setInstallPath] = useState('');
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [unsaved, setUnsaved] = useState(false);

  const loadSettings = async () => {
    await settingsUtil.read();
    const { settings } = settingsUtil;
    setInstallPath(settings.dbdInstallPath);
    setAutoUpdate(settings.autoUpdate);
    setShowCreate(settings.showCreate);
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const saveButtonValue = 'Save' + (unsaved ? '*' : '');
  return (
    <Col className="col-8">
      <Form
        onSubmit={async e => {
          e.preventDefault();
          await doSave(installPath, autoUpdate, showCreate);
          setUnsaved(false);
        }}
        onChange={() => setUnsaved(true)}
      >
        <PlainTextInput
          label="Dead By Daylight Install Path"
          value={installPath}
          onChange={e => setInstallPath(e.target.value)}
        />
        <Form.Group>
          <Form.Check
            type="checkbox"
            label="Auto-Update"
            checked={autoUpdate}
            onChange={e => {
              setAutoUpdate(e.target.checked);
            }}
          />
        </Form.Group>
        <Form.Group>
          <Form.Check
            type="checkbox"
            label="Show Create Tab (Requires Restart)"
            checked={showCreate}
            onChange={e => {
              setShowCreate(e.target.checked);
            }}
          />
        </Form.Group>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Button variant="dark" type="submit">
            {saveButtonValue}
          </Button>
          <Button
            variant="dark"
            style={{ marginLeft: 'auto', marginRight: '3px' }}
            onClick={async () => {
              await settingsUtil.setDefaultSettings();
              await settingsUtil.save();
              loadSettings();
            }}
          >
            Reset to Default
          </Button>
          <Button variant="dark" onClick={() => openLogs()}>
            Open Logs
          </Button>
        </div>
      </Form>
    </Col>
  );
}
