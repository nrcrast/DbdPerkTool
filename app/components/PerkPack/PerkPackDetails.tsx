import React, { Component, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import PerkPackMeta from './PerkPackMeta';

type MyProps = {
  meta: any;
  baseUrl: string;
};

function buildImgRow(
  images: Array<string>,
  label: string,
  colWidth: number = 12
) {
  const cols = images.map((url: string) => {
    return (
      <Col>
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
  let portraitImg = undefined;
  if (props.meta.hasPortraits) {
    portraitImg = buildImgRow(
      [0, 1, 2, 3].map(i => {
        return `${props.baseUrl}/portraits_${i}.png`;
      }),
      'Portraits',
      12
    );
  }

  let itemImg = undefined;
  if (props.meta.hasItems) {
    itemImg = buildImgRow(
      [0, 1, 2, 3].map(i => {
        return `${props.baseUrl}/items_${i}.png`;
      }),
      'Items',
      8
    );
  }

  let statusImg = undefined;
  if (props.meta.hasStatusEffects) {
    statusImg = buildImgRow(
      [0, 1, 2, 3].map(i => {
        return `${props.baseUrl}/statusEffects_${i}.png`;
      }),
      'Status Effects',
      6
    );
  }
  return (
    <div className="m-2">
      <Card.Text>
        <b>Description: </b>
        <i>{props.meta.description}</i>
      </Card.Text>
      {portraitImg}
      {itemImg}
      {statusImg}
    </div>
  );
}
