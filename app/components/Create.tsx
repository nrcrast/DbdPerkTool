import React, { Component, useState, useEffect, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import ProgressBar from 'react-bootstrap/ProgressBar';
import fs from 'fs-extra';
import PackDir from '../packdir/PackDir';
import PackGenerator from '../packgenerator/PackGenerator';
import PlainTextInput from './Form/PlainTextInput';
import ErrorModal from './ErrorModal';
import SuccessModal from './SuccessModal';
import log from 'electron-log';
import axios from 'axios';
import PackMeta from '../models/PackMeta';
import settingsUtil from '../settings/Settings';
import styled from 'styled-components';
import api from '../api/Api';
import UserContext from '../context/UserContext';
import NoAuthorProfile from './NoAuthorProfile';

axios.defaults.adapter = require('axios/lib/adapters/xhr.js');

const { dialog } = require('electron').remote;

type MyProps = {};

const CreateButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Create(props: MyProps) {
  const [packDir, setPackDir] = useState('');
  const [errorModalShow, setErrorModalShow] = useState(false);
  const [successModalShow, setSuccessModalShow] = useState(false);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveProgress, setSaveProgress] = useState(0);
  const [isNsfw, setIsNsfw] = useState(false);
  const [description, setDescription] = useState('');
  const [errorText, setErrorText] = useState('');
  const [successText, setSuccessText] = useState('');
  const [packs, setPacks] = useState([]);
  const userContext = useContext(UserContext);

  if (!userContext.user.authorProfile) {
    return <NoAuthorProfile />;
  }

  const autoAuthor = userContext.user.abilities.cannot('manage', 'all');

  const loadPacks = async () => {
    const packs = await axios.get(
      `${settingsUtil.get('targetServer')}/packs?all=true`
    );
    setPacks(packs.data);
  };

  useEffect(() => {
    loadPacks();
  }, []);

  const doCreate = async e => {
    e.preventDefault();
    const packDirModel = new PackDir(packDir);

    const validationStatus = await packDirModel.validate();

    if (validationStatus.isValid === false) {
      setErrorText(validationStatus.failReason);
      setErrorModalShow(true);
      return;
    }
    setSaveProgress(0);
    setSaving(true);

    const generator = new PackGenerator(
      packDirModel,
      undefined,
      title,
      autoAuthor ? userContext.user.authorProfile.name : author,
      description,
      isNsfw,
      validationStatus.skipFiles
    );

    try {
      log.debug('Generating output zip');
      const outputZip = await generator.generate();
      // This is just a little hack to update the JWT if necessary before the upload
      // The upload doesn't use swagger client, and I did not want to re-write the JWT refresh
      // logic
      log.debug('Output zip generated. Uploading...');
      await api.getUser();
      // await api.uploadZip(outputZip, progress => {
      //   setSaveProgress(progress);
      // });
      setSuccessText(
        `Your pack has been uploaded. Zip has also been generated at ${outputZip}`
      );
      setSaving(false);
      setSuccessModalShow(true);
    } catch (e) {
      log.debug(`Error uploading pack: `, e.response);
      setErrorText(`Error generating or uploading Pack: ${e}`);
      setSaving(false);
      setErrorModalShow(true);
    }
  };

  const handleFormChanged = async () => {};

  const pickPackDir = async () => {
    const dir = await dialog.showOpenDialog({
      properties: ['openDirectory']
    });

    if (!dir.canceled && dir.filePaths.length > 0) {
      setPackDir(dir.filePaths[0]);
    }
  };

  const errorModalTitle = 'Error generating pack';
  const errorModalText = errorText;
  const successModalTitle = 'Success';

  return (
    <Col className="col-8">
      <Form
        className="md-form"
        onSubmit={doCreate}
        onChange={handleFormChanged}
      >
        <PlainTextInput
          label="Title"
          onInputChange={(text: string, event: Event) => {
            setTitle(text);
          }}
          onChange={(selected: any) => {
            if (selected && selected.length > 0) {
              const targetPack = selected[0];
              if(!targetPack.customOption) {
                setTitle(targetPack.name);
                setDescription(targetPack.description);
                setAuthor(targetPack.author);
                setIsNsfw(targetPack.isNsfw);
              } else {
                setTitle(targetPack.name);
              }
            } 
          }}
          options={packs.sort()}
        />
        <PlainTextInput
          label="Description"
          onChange={e => {
            setDescription(e.target.value);
          }}
          value={description}
        />
        {!autoAuthor && (
          <PlainTextInput
            label="Author"
            onChange={e => {
              setAuthor(e.target.value);
            }}
            value={author}
          />
        )}

        <Form.Group>
          <Form.Check
            type="checkbox"
            label="NSFW"
            checked={isNsfw}
            onChange={e => {
              setIsNsfw(e.target.checked);
            }}
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
                value={packDir}
                className="dbd-input-field"
                onChange={e => {
                  setPackDir(e.target.value);
                }}
              />
            </Col>
            <Col>
              <Button variant="secondary" onClick={pickPackDir}>
                Browse
              </Button>
            </Col>
          </Form.Row>
        </Form.Group>

        <CreateButtonWrapper>
          <Button variant="secondary" type="submit" className="mb-1">
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
              className="mr-2"
              hidden={!saving}
            />
            Upload Pack
          </Button>
          {saving && (
            <ProgressBar now={saveProgress} label={`${saveProgress}%`} />
          )}
        </CreateButtonWrapper>
      </Form>
      <ErrorModal
        title={errorModalTitle}
        text={errorModalText}
        show={errorModalShow}
        onHide={() => setErrorModalShow(false)}
      />
      <SuccessModal
        title={successModalTitle}
        text={successText}
        show={successModalShow}
        onHide={() => setSuccessModalShow(false)}
      />
    </Col>
  );
}
