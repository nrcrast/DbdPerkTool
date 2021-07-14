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

type MyProps = {
    onConfirm: Function;
};

export default function ConnectAuthor(props: MyProps) {

  const [steamId, setSteamId] = useState('');
  const [author, setAuthor] = useState('');

  return (
    <div>
        <PlainTextInput label="Steam Id" value={steamId} onChange={(text) => {setSteamId(text.target.value)}}></PlainTextInput>
        <PlainTextInput label="Author" value={author} onChange={(text) => {setAuthor(text.target.value)}}></PlainTextInput>
        <Button variant='secondary' onClick={() => {props.onConfirm(steamId, author)}}>Set</Button>
    </div>
  );
}
