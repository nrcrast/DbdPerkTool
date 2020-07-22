import React, { Component, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Image from 'react-bootstrap/Image';
import slugify from '@sindresorhus/slugify';

type MyProps = {
  type: string;
  baseUrl: string;
};

export default function GalleryTab(props: MyProps) {
  const typeToTitle = {
    favors: 'Offerings',
    items: 'Items',
    itemaddons: 'Add-Ons',
    perks: 'Perks',
    statuseffects: 'Status Effects',
    powers: 'Powers',
    charportraits: 'Portraits',
    actions: 'Actions'
  };
  console.log('sdfoksdfpoks');
  const title = typeToTitle[props.type];
  const url = `${props.baseUrl}gallery_${props.type}.png`;
  return (
    <Tab eventKey={slugify(title.toLowerCase())} title={title}>
      <Image src={url} fluid />
    </Tab>
  );
}
