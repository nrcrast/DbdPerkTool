import React, { Component, useState, useEffect } from 'react';
import path from 'path';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip';
import styled from 'styled-components';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import FormCheck from 'react-bootstrap/FormCheck';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import settingsUtil from '../settings/Settings';
import PlainTextInput from './Form/PlainTextInput';
import log from 'electron-log';
import { app, remote, shell } from 'electron';

const mainWindow = remote.getCurrentWindow();

type MyProps = {};

const TooltipWrapper = styled.div`
  display: flex;
  align-items: center;
`;

async function doSave(installPath, autoUpdate, showNsfw, writeToTxt, deleteAfterUpload) {
  settingsUtil.settings.dbdInstallPath = installPath;
  settingsUtil.settings.autoUpdate = autoUpdate;
  settingsUtil.settings.showNsfw = showNsfw;
  settingsUtil.settings.writeToTxt = writeToTxt;
  settingsUtil.settings.deleteAfterUpload = deleteAfterUpload;
  await settingsUtil.save();
}

function openLogs() {
  const logPath = path.resolve((app || remote.app).getPath('userData'), 'logs');
  shell.openExternal(logPath);
}

export default function Settings(props: MyProps) {
  const [installPath, setInstallPath] = useState('');
  const [autoUpdate, setAutoUpdate] = useState(false);
  const [showNsfw, setShowNsfw] = useState(false);
  const [unsaved, setUnsaved] = useState(false);
  const [writePackToTxt, setWritePackToTxt] = useState(false);
  const [deleteZipAfterUpload, setDeleteZipAfterUpload] = useState(true);

  const writePackTxtPath = path.resolve(
    (app || remote.app).getPath('userData'),
    'currentperkpack.txt'
  );
  const writePackTxtTooltipMsg = `Write current installed pack name and author to .txt file located at ${writePackTxtPath}`;

  const renderTooltip = props => (
    <Tooltip id="writepack-tooltip" {...props}>
      {writePackTxtTooltipMsg}
    </Tooltip>
  );

  const loadSettings = async () => {
    await settingsUtil.read();
    const { settings } = settingsUtil;
    setInstallPath(settings.dbdInstallPath);
    setAutoUpdate(settingsUtil.get('autoUpdate'));
    setShowNsfw(settingsUtil.get('showNsfw'));
    setWritePackToTxt(settingsUtil.get('writeToTxt'));
    setDeleteZipAfterUpload(settingsUtil.get('deleteAfterUpload'));
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
          await doSave(installPath, autoUpdate, showNsfw, writePackToTxt, deleteZipAfterUpload);
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
            label="Show NSFW"
            checked={showNsfw}
            onChange={e => {
              setShowNsfw(e.target.checked);
            }}
          />
        </Form.Group>
        <Form.Group>
          <TooltipWrapper>
            <Form.Check
              type="checkbox"
              label="Write current pack to .txt"
              checked={writePackToTxt}
              onChange={e => {
                setWritePackToTxt(e.target.checked);
              }}
            />
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <i className="fas fa-question-circle ml-2"></i>
            </OverlayTrigger>
          </TooltipWrapper>
        </Form.Group>
        <Form.Group>
            <Form.Check
              type="checkbox"
              label="Delete .zip after upload"
              checked={deleteZipAfterUpload}
              onChange={e => {
                setDeleteZipAfterUpload(e.target.checked);
              }}
            />
        </Form.Group>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Button variant="secondary" type="submit">
            {saveButtonValue}
          </Button>
          <Button
            variant="secondary"
            style={{ marginLeft: 'auto', marginRight: '3px' }}
            onClick={async () => {
              await settingsUtil.setDefaultSettings();
              await settingsUtil.save();
              loadSettings();
            }}
          >
            Reset to Default
          </Button>
          <Button
            variant="secondary"
            style={{ marginRight: '3px' }}
            onClick={() => openLogs()}
          >
            Open Logs
          </Button>
          <Button
            variant="secondary"
            style={{ marginRight: '3px' }}
            onClick={async () => {
              await mainWindow.webContents.session.clearCache();
              (app || remote.app).relaunch();
              (app || remote.app).exit();
            }}
          >
            Clear Cache (and restart)
          </Button>
        </div>
      </Form>
    </Col>
  );
}
