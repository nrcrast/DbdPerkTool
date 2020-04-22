import React, { Component, useState } from 'react';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

type MyProps = {
  latestChapter: string;
  author: string;
  downloads: number;
  popularity: string;
  onAuthorClick: any;
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

      <Row className="justify-content-center">
        <p>
          <b>Author:</b>{' '}
          <a href="#" onClick={props.onAuthorClick}>
            {props.author}
          </a>
        </p>
      </Row>

      <Row className="justify-content-center">
        <p>
          <b>Downloads:</b> {props.downloads}
        </p>
      </Row>
      <Row className="justify-content-center">
        <p>
          <b>Popularity:</b> {props.popularity}
        </p>
      </Row>
    </div>
  );
}
