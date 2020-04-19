import React, { Component, useState } from 'react';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';
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
    <Row className="justify-content-center">
      <ListGroup horizontal className="shadow">
        <HasItem label="Portraits" has={props.portraits} />
        <HasItem label="Powers" has={props.powers} />
        <HasItem label="Items" has={props.items} />
        <HasItem label="Status Effects" has={props.statusEffects} />
      </ListGroup>
    </Row>
  );
}
