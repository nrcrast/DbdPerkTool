import React, { Component, useState } from 'react';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

type MyProps = {
  latestChapter: string;
  author: string;
  downloads: number;
  popularity: string;
};
type MyState = {};

export default function PerkPackMeta(props: MyProps) {
  return (
    <Row className="justify-content-center mb-1">
      <ListGroup horizontal className="shadow">
        <ListGroupItem>
          <b>Latest Chapter:</b> {props.latestChapter}
        </ListGroupItem>
        <ListGroupItem><b>Author:</b> {props.author}</ListGroupItem>
        <ListGroupItem><b>Downloads:</b> {props.downloads}</ListGroupItem>
        <ListGroupItem><b>Popularity:</b> {props.popularity}</ListGroupItem>
      </ListGroup>
    </Row>
  );
}
