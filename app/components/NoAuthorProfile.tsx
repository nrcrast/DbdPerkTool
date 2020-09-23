import React, { Component, useContext } from 'react';
import PerkPack from './PerkPack';
import PortraitPack from './PortraitPack';
import PackDisplay from './PackDisplay';
import UserContext from '../context/UserContext';
import styled from 'styled-components';
import Col from 'react-bootstrap/Col';

type MyProps = {};
type MyState = {};

const NoProfileMsgWrapper = styled.div`
  text-align: center;
  box-shadow: 0 0.5rem 1rem rgba(35, 132, 164, 0.6);
  background: rgba(48, 48, 48, 0.5);
  margin-top: 100px;
  padding: 20px;
`;


export default function NoAuthorProfile() {
  return (
    <Col className="col-8">
        <NoProfileMsgWrapper>
          <h3>You do not yet have an author profile linked to your account.</h3>
          <h4>
            Please contact Sup3rStabby in order to connect your user account to
            your author profile.
          </h4>
        </NoProfileMsgWrapper>
    </Col>
  );
}
