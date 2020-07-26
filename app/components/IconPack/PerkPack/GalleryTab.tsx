import React, { Component, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Image from 'react-bootstrap/Image';
import slugify from '@sindresorhus/slugify';
import getLanguage from '../../../language/Language';

type MyProps = {
  type: string;
  baseUrl: string;
};

export default function GalleryTab(props: MyProps) {
  const title = getLanguage(props.type);
  const url = `${props.baseUrl}gallery_${props.type}.png`;
  return (
    <Tab eventKey={slugify(title.toLowerCase())} title={title}>
      <Image src={url} fluid />
    </Tab>
  );
}
