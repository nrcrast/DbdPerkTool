import React, { Component, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

type MyProps = {
  meta: any;
  id: string;
  show: boolean;
  onHide: Function;
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
  const baseUrl = `https://d43kvaebi7up3.cloudfront.net/${encodeURIComponent(
    props.id
  )}`;
  let portraitImg = undefined;
  if (props.meta.hasPortraits) {
    portraitImg = buildImgRow(
      [0, 1, 2, 3].map(i => {
        return `${baseUrl}/portraits_${i}.png`;
      }),
      'Portraits',
      12
    );
  }

  let offeringsImg = undefined;
  if (props.meta.hasFavors) {
    offeringsImg = buildImgRow(
      [0, 1, 2, 3, 4].map(i => {
        return `${baseUrl}/favors_${i}.png`;
      }),
      'Offerings',
      12
    );
  }

  let itemImg = undefined;
  if (props.meta.hasItems) {
    itemImg = buildImgRow(
      [0, 1, 2, 3, 4].map(i => {
        return `${baseUrl}/items_${i}.png`;
      }),
      'Items',
      12
    );
  }

  let addonsImg = undefined;
  if (props.meta.hasItemAddOns) {
    addonsImg = buildImgRow(
      [0, 1, 2, 3].map(i => {
        return `${baseUrl}/addons_${i}.png`;
      }),
      'Add-Ons',
      12
    );
  }

  let powersImg = undefined;
  if (props.meta.hasPowers) {
    powersImg = buildImgRow(
      [0, 1, 2, 3].map(i => {
        return `${baseUrl}/powers_${i}.png`;
      }),
      'Killer Powers',
      12
    );
  }

  let statusImg = undefined;
  if (props.meta.hasStatusEffects) {
    statusImg = buildImgRow(
      [0, 1, 2, 3].map(i => {
        return `${baseUrl}/statusEffects_${i}.png`;
      }),
      'Status Effects',
      12
    );
  }
  return (
    <Modal
      show={props.show}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      onHide={props.onHide}
      centered
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
              <br/>
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
          {/* <Tab eventKey="perks" title="Perks">
            <p>PERKS</p>
          </Tab>
          <Tab eventKey="items" title="Items">
            <p>ITEMS</p>
          </Tab> */}
        </Tabs>
      </Modal.Body>
    </Modal>
  );
}