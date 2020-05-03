import React, { Component, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import PortraitPackMeta from './PortraitPackMeta';

type MyProps = {
  meta: any;
  downloads: number;
  popularity: string;
  onAuthorClick: any;
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

export default function PortraitPackDetails(props: MyProps) {
  return (
    <div className="m-2">
      <Card.Text>
        <b>Description: </b>
        <i>{props.meta.description}</i>
      </Card.Text>
      <PortraitPackMeta
        latestChapter={props.meta.latestChapter}
        author={props.meta.author}
        downloads={props.downloads}
        popularity={props.popularity}
        onAuthorClick={props.onAuthorClick}
      />
    </div>
  );
}
