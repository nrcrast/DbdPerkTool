import React, { Component, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import HasItem from './HasItem';

type MyProps = {
  portraits: boolean;
  powers: boolean;
  items: boolean;
  statusEffects: boolean;
  offerings: boolean;
  addons: boolean;
  perks: boolean;
};
type MyState = {};

export default function PerkPackHas(props: MyProps) {
  return (
    <div>
      <Row className="justify-content-center no-gutters">
      <Col className="col-md">
          <HasItem label="Perks" has={props.perks} />
        </Col>
        <Col className="col-md">
          <HasItem label="Portraits" has={props.portraits} />
        </Col>
        <Col className="col-md">
          <HasItem label="Powers" has={props.powers} />
        </Col>
        <Col className="col-md">
          <HasItem label="Items" has={props.items} />
        </Col>
      </Row>
      <Row className="justify-content-center no-gutters">
        <Col className="col-md">
          <HasItem label="Status" has={props.statusEffects} />
        </Col>
        <Col className="col-md">
          <HasItem label="Offerings" has={props.offerings} />
        </Col>
        <Col className="col-md">
          <HasItem label="Add-Ons" has={props.addons} />
        </Col>
      </Row>
    </div>
  );
}
