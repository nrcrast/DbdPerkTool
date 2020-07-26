import React, { Component, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import GalleryTab from './GalleryTab';
import slugify from '@sindresorhus/slugify';

type MyProps = {
  meta: any;
  id: string;
  show: boolean;
  onHide: Function;
};

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

function buildImgRow(
  images: Array<string>,
  label: string,
  colWidth: number = 12
) {
  const cols = images.map((url: string, index: number) => {
    return (
      <Col key={`perkpackdetails-col-${index}`}>
        <Image src={url} fluid />
      </Col>
    );
  });

  const colClass = `col-${colWidth}`;

  return (
    <Card.Body>
      <b>{label}</b>
      <Row className="justify-content-center mt-2">
        <Col className={colClass}>
          <Row className="flex-nowrap">{cols}</Row>
        </Col>
      </Row>
    </Card.Body>
  );
}

export default function PerkPackDetails(props: MyProps) {
  const baseUrl = props.meta.previewDir;
  let portraitImg = undefined;

  const capabilities = [];

  if(props.meta.hasPerks) {
    capabilities.push('perks');
  }

  if (props.meta.hasPortraits) {
    capabilities.push('charportraits');
    portraitImg = buildImgRow(
      [0, 1, 2, 3].map(i => {
        return `${baseUrl}portraits_${i}.png`;
      }),
      'Portraits',
      12
    );
  }

  let offeringsImg = undefined;
  if (props.meta.hasFavors) {
    capabilities.push('favors');
    offeringsImg = buildImgRow(
      [0, 1, 2, 3, 4].map(i => {
        return `${baseUrl}favors_${i}.png`;
      }),
      'Offerings',
      12
    );
  }

  let itemImg = undefined;
  if (props.meta.hasItems) {
    capabilities.push('items');
    itemImg = buildImgRow(
      [0, 1, 2, 3, 4].map(i => {
        return `${baseUrl}items_${i}.png`;
      }),
      'Items',
      12
    );
  }

  let addonsImg = undefined;
  if (props.meta.hasItemAddOns) {
    capabilities.push('itemaddons');
    addonsImg = buildImgRow(
      [0, 1, 2, 3].map(i => {
        return `${baseUrl}addons_${i}.png`;
      }),
      'Add-Ons',
      12
    );
  }

  let powersImg = undefined;
  if (props.meta.hasPowers) {
    capabilities.push('powers');
    powersImg = buildImgRow(
      [0, 1, 2, 3].map(i => {
        return `${baseUrl}powers_${i}.png`;
      }),
      'Killer Powers',
      12
    );
  }

  let statusImg = undefined;
  if (props.meta.hasStatusEffects) {
    capabilities.push('statuseffects');
    statusImg = buildImgRow(
      [0, 1, 2, 3].map(i => {
        return `${baseUrl}statusEffects_${i}.png`;
      }),
      'Status Effects',
      12
    );
  }

  if (props.meta.hasActions) {
    capabilities.push('actions');
  }


  return (
    <Modal
      show={props.show}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      onHide={props.onHide}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.meta.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs defaultActiveKey="overview" id="uncontrolled-tab-example">
          <Tab eventKey="overview" title="Overview">
            <Card.Body>
              <b>Description: </b>
              <i>{props.meta.description}</i>
              <br />
              <b>Latest Chapter: </b>
              <i>{props.meta.latestChapter}</i>
            </Card.Body>

            {portraitImg}
            {offeringsImg}
            {itemImg}
            {addonsImg}
            {powersImg}
            {statusImg}
          </Tab>
          {capabilities.map(capability => (
            <Tab key={slugify(typeToTitle[capability].toLowerCase())} eventKey={slugify(typeToTitle[capability].toLowerCase())} title={typeToTitle[capability]} className="text-center">
              <Image src={`${baseUrl}gallery_${capability}.png`} fluid />
            </Tab>
          ))}
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}
