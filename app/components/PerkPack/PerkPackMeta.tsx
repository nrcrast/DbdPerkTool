import React, { Component, useState } from 'react';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

type MyProps = {
  latestChapter: string;
  author: string;
};
type MyState = {};

export default function PerkPackMeta(props: MyProps) {
  return (
    <div>
      <Row className="justify-content-center">
        <p>
          <b>Latest Chapter:</b> {props.latestChapter}
        </p>
      </Row>
    </div>
  );
}
