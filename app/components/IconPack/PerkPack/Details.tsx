import React, { Component, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import slugify from '@sindresorhus/slugify';
import uuid from 'react-uuid';
import getLanguage from '../../../language/Language';
import settingsUtil from '../../../settings/Settings';


type MyProps = {
  meta: any;
  id: string;
  show: boolean;
  onHide: Function;
};

function buildImgRow(
  images: Array<string>,
  label: string,
  colWidth: number = 12,
  className: string
) {
  const cols = images.map((url: string, index: number) => {
    return (
      <Col key={uuid()}>
        <Image src={url} className={className} fluid />
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

  if (props.meta.hasPerks) {
    capabilities.push('perks');
  }

  const imgClass = (props.meta.isNsfw && !settingsUtil.settings.showNsfw) ? 'img-blurred' : '';

  if (props.meta.hasPortraits) {
    capabilities.push('charportraits');
    portraitImg = buildImgRow(
      [0, 1, 2, 3].map(i => {
        return `${baseUrl}portraits_${i}.png`;
      }),
      'Portraits',
      12,
      imgClass
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
      12,
      imgClass
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
      12,
      imgClass
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
      12,
      imgClass
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
      12,
      imgClass
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
      12,
      imgClass
    );
  }

  if (props.meta.hasActions) {
    capabilities.push('actions');
  }

  if(props.meta.hasArchive) {
    capabilities.push('archive');
  }

  if(props.meta.hasBanners) {
    capabilities.push('banners');
  }

  if(props.meta.hasDailyRituals) {
    capabilities.push('dailyrituals');
  }

  if(props.meta.hasEmblems) {
    capabilities.push('emblems');
  }

  if(props.meta.hasEvents) {
    capabilities.push('events');
  }

  if(props.meta.hasHelp) {
    capabilities.push('help');
  }

  if(props.meta.hasHelpLoading) {
    capabilities.push('helploading');
  }

  if(props.meta.hasStoreBackgrounds) {
    capabilities.push('storebackgrounds');
  }

  if(props.meta.hasStoreTabs) {
    capabilities.push('storetabs');
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
            <Tab
              key={slugify(getLanguage(capability).toLowerCase())}
              eventKey={slugify(getLanguage(capability).toLowerCase())}
              title={getLanguage(capability)}
              className="text-center"
            >
              <Image className={imgClass} src={`${baseUrl}gallery_${capability}.png`} fluid />
            </Tab>
          ))}
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}
