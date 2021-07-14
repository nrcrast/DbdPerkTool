import React, { Component, useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import routes from '../../constants/routes.json';
import fs from 'fs-extra';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import PlainTextInput from '../Form/PlainTextInput';
import UserContext from '../../context/UserContext';
import AuthorLink from '../MyProfile/AuthorLink';
import uuid from 'react-uuid';
import SuccessModal from '../SuccessModal';
import api from '../../api/Api';
import NoAuthorProfile from '../NoAuthorProfile';
import SendNotification from './SendNotification';
import ErrorModal from '../ErrorModal';
import ConnectAuthor from './ConnectAuthor';

type MyProps = {};

const DescriptionHeader = styled.h4``;

export default function Admin(props: MyProps) {
  const userContext = useContext(UserContext);

  const [showSendNotif, setShowSendNotif] = useState(false);
  const [showSendSuccess, setShowSendSuccess] = useState(false);
  const [showSendFail, setShowSendFail] = useState(false);

  if (!userContext.user) {
    return <Redirect to={routes.PERKS} />;
  }

  if (!userContext.user.authorProfile) {
    return <NoAuthorProfile />;
  }

  return (
    <Col className="col-8">
      <DescriptionHeader>Admin Controls</DescriptionHeader>
      <Button
        variant="secondary"
        onClick={() => {
          setShowSendNotif(true);
        }}
      >
        Send notification
      </Button>
      <SendNotification
        show={showSendNotif}
        onConfirm={async (file: string, title: string) => {
          setShowSendNotif(false);
          const fileContents = await fs.readFile(file, 'utf-8');
          try {
            await api.executor.apis.default.addNotification(
              {},
              {
                requestBody: {
                  name: title,
                  text: fileContents
                }
              }
            );
            setShowSendSuccess(true);
          } catch (err) {
            setShowSendFail(true);
          }
        }}
        onHide={() => {
          setShowSendNotif(false);
        }}
      ></SendNotification>
      <ConnectAuthor onConfirm={async (steamId: string, author: string) => {
        try {
          await api.connectAuthor(steamId, author)
          setShowSendSuccess(true);
        } catch (e) {
          setShowSendFail(true);
        }
      }}></ConnectAuthor>
      <SuccessModal
        title="Success"
        text="Nice job dude"
        show={showSendSuccess}
        onHide={() => {
          setShowSendSuccess(false);
        }}
      ></SuccessModal>
      <ErrorModal
        title="Error"
        text="Unknown error"
        show={showSendFail}
        onHide={() => {
          setShowSendFail(false);
        }}
      ></ErrorModal>
    </Col>
  );
}
