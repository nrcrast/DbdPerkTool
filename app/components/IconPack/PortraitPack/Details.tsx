import React, { Component, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Modal from 'react-bootstrap/Modal';

type MyProps = {
  meta: any;
  id: string;
  show: boolean;
  onHide: Function;
};

export default function PerkPackDetails(props: MyProps) {
  const { meta } = props;
  const baseUrl = meta.previewDir;

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
        <Card.Body>
          <b>Description: </b>
          <i>{props.meta.description}</i>
          <br />
          <b>Latest Chapter: </b>
          <i>{props.meta.latestChapter}</i>
        </Card.Body>
        <Image src={`${baseUrl}gallery_charportraits.png`} fluid />
      </Modal.Body>
    </Modal>
  );
}
