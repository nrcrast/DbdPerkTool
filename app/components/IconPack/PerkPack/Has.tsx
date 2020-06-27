import React, { Component, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HasItem from './HasItem';

type MyProps = {
  portraits: boolean;
  powers: boolean;
  items: boolean;
  statusEffects: boolean;
};
type MyState = {};

export default function PerkPackHas(props: MyProps) {
  return (
    <Row className="justify-content-center no-gutters">
      <Col className='col-md'>
      <HasItem label="Portraits" has={props.portraits} />
      </Col>
      <Col className='col-md'>
      <HasItem label="Powers" has={props.powers} />
      </Col>
      <Col className='col-md'>
      <HasItem label="Items" has={props.items} />
      </Col>
      <Col className='col-md'>
      <HasItem label="Status" has={props.statusEffects} />
      </Col>
    </Row>
  );
}
