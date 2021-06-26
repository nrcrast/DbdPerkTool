import React, { Component, useState, useContext } from 'react';
import fs from 'fs-extra';
import log from 'electron-log';
import path from 'path';
import { app, remote, shell } from 'electron';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import styled from 'styled-components';
import UserContext from '../../context/UserContext';
import Spinner from 'react-bootstrap/Spinner';
import ErrorModal from '../ErrorModal';
import SuccessModal from '../SuccessModal';
import api from '../../api/Api';
import EditPackModal from './EditPackModal';
import UpdatePackModal from './UpdatePackModal';
import PackDir from '../../packdir/PackDir';
import PackGenerator from '../../packgenerator/PackGenerator';
import settingsUtil from '../../settings/Settings';
import { promisify } from 'util';
import rimraf from 'rimraf';

type MyProps = {
  id: string;
  meta: any;
  onModifyComplete: any;
};

const AdminControlsWrapper = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 4px;
  margin-top: 4px;
`;

export default function AdminControls(props: MyProps) {
  const userContext = useContext(UserContext);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [showEditPack, setShowEditPack] = useState(false);
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const [showError, setShowError] = useState(false);
  const [editInProgress, setEditInProgress] = useState(false);
  const [showUpdatePack, setShowUpdatePack] = useState(false);
  const [updateInProgress, setUpdateInProgress] = useState(false);
  const [updatePercent, setUpdatePercent] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successText, setSuccessText] = useState('');

  const doPackUpload = async (packDir: string) => {
    setUpdateInProgress(true);
    const packDirModel = new PackDir(packDir);

    const validationStatus = await packDirModel.validate();

    if (validationStatus.isValid === false) {
      setErrorText(validationStatus.failReason);
      setShowError(true);
      return;
    }

    log.debug('Pack Contents: ', await packDirModel.getMeta());

    setUpdatePercent(0);

    const generator = new PackGenerator(
      packDirModel,
      undefined,
      props.meta.name,
      props.meta.author,
      props.meta.description,
      props.meta.isNsfw,
      validationStatus.skipFiles
    );

    let outputZip;

    try {
      outputZip = await generator.generate();
      // This is just a little hack to update the JWT if necessary before the upload
      // The upload doesn't use swagger client, and I did not want to re-write the JWT refresh
      // logic
      await api.getUser();
      await api.uploadZip(outputZip, progress => {
        setUpdatePercent(progress);
      });
      setSuccessText(
        'Pack has been uploaded and currently is being processed. It may take up to 10 minutes for changes to be reflected in the Toolbox.'
      );
      setShowSuccess(true);
    } catch (e) {
      setErrorText(`Error generating or uploading Pack: ${e}`);
      setShowError(true);
    } finally {
      setUpdateInProgress(false);
      setShowUpdatePack(false);

      if(outputZip && settingsUtil.get('deleteAfterUpload') === true) {
        const rmrf = promisify(rimraf);
        log.info(`Removing output zip ${outputZip}`);
        await rmrf(outputZip);
      }
    }
  };

  const handleDeleteClose = async (doDelete = false) => {
    setDeleteInProgress(true);
    try {
      if (doDelete) {
        await api.executor.apis.default.deletePack({ id: props.id });
        props.onModifyComplete();
      }
    } catch (e) {
      setErrorText(e.message);
      setShowError(true);
      // Show error
    } finally {
      setDeleteInProgress(false);
      setShowConfirm(false);
    }
  };

  return (
    <AdminControlsWrapper>
      <Button
        className="w-100 mr-1 ml-1"
        variant="info"
        onClick={() => {
          setShowEditPack(true);
        }}
      >
        Edit
      </Button>
      <Button
        className="w-100 mr-1"
        variant="info"
        onClick={() => {
          setShowUpdatePack(true);
        }}
      >
        Update
      </Button>
      <Button
        className="w-100 mr-1"
        variant="info"
        onClick={async () => {
          setShowConfirm(true);
        }}
      >
        Delete
      </Button>
      <Modal
        show={showConfirm}
        onHide={() => {
          handleDeleteClose(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This will delete pack {props.meta.name}. Are you sure about that?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="info"
            onClick={() => {
              handleDeleteClose(true);
            }}
          >
            {deleteInProgress && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <ErrorModal
        title="Error Modifying Pack"
        onHide={() => setShowError(false)}
        show={showError}
        text={errorText}
      ></ErrorModal>
      <SuccessModal
        title={`${props.meta.name} Updated`}
        show={showSuccess}
        onHide={() => setShowSuccess(false)}
        text={successText}
      ></SuccessModal>
      <EditPackModal
        operationInProgress={editInProgress}
        show={showEditPack}
        onHide={() => {
          setShowEditPack(false);
        }}
        onConfirm={async (name: string, desc: string) => {
          if (name !== props.meta.name || desc !== props.meta.description) {
            setEditInProgress(true);
            try {
              await api.executor.apis.default.editPack(
                { id: props.id },
                { requestBody: { name, description: desc } }
              );
              props.onModifyComplete();
            } catch (e) {
              setErrorText(e.message);
              setShowError(true);
              // Show error
            } finally {
              setEditInProgress(false);
              setShowEditPack(false);
            }
          } else {
            setShowEditPack(false);
          }
        }}
        packName={props.meta.name}
        packDescription={props.meta.description}
      ></EditPackModal>
      <UpdatePackModal
        show={showUpdatePack}
        onHide={() => {
          setShowUpdatePack(false);
        }}
        onConfirm={async (packDir: string) => {
          await doPackUpload(packDir);
          setTimeout(() => {
            props.onModifyComplete();
          }, 60000);
        }}
        name={props.meta.name}
        operationInProgress={updateInProgress}
        updatePercent={updatePercent}
      ></UpdatePackModal>
    </AdminControlsWrapper>
  );
}
