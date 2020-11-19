/* eslint-disable no-else-return */
import React, { Component, useState } from 'react';
import styled from 'styled-components';
import { shell } from 'electron';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

type MyProps = {
  text: string;
  to: string;
  currentActive: string;
  image: string;
  icon: string;
  onClick: Function;
};

const SocialWrapper = styled.div`
  margin-bottom: 10px;
`;
const BadgeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  margin-bottom: 10px;
`;

const Badge = styled.i`
  margin-left: 3px;
  margin-right: 3px;

  &:hover {
    color: var(--main-color);
    cursor: pointer;
  }
`;

function openLink(link) {
  shell.openExternal(link);
}

export default function Social(props: MyProps) {
  const youtubeLink =
    'https://www.youtube.com/channel/UCD6AGq4Bokm2k3S8n1dTAtQ';
  const twitchLink = 'https://www.twitch.tv/sup3rstabby';
  const discordLink = 'https://discordapp.com/invite/3WexstV';
  const patreonLink = 'https://www.patreon.com/bePatron?u=37513035';
  return (
    <SocialWrapper>
      <BadgeWrapper>
        <Badge
          className="fab fa-youtube fa-lg"
          onClick={() => {
            openLink(youtubeLink);
          }}
        ></Badge>
        <Badge
          className="fab fa-twitch fa-lg"
          onClick={() => {
            openLink(twitchLink);
          }}
        ></Badge>
        <Badge
          className="fab fa-discord fa-lg"
          onClick={() => {
            openLink(discordLink);
          }}
        ></Badge>
      </BadgeWrapper>
      <Button
        variant="danger"
        onClick={() => {
          openLink(patreonLink);
        }}
      >
        Click here to donate!
        <br />
        <small>Your donations keep this tool alive</small>
      </Button>
    </SocialWrapper>
  );
}
