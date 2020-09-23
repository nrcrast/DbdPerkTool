import React, { Component, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReactHtmlParser from 'react-html-parser'; 
import MarkdownIt from 'markdown-it';
import settingsUtil from '../settings/Settings';

const md = new MarkdownIt();

type MyProps = {
  show: any;
  onHide: any;
  id: string;
  title: string;
  text: string;
};

export default function Notification(props: MyProps) {
  const dismiss = async () => {
    settingsUtil.settings.lastNotificationRead = props.id;
    await settingsUtil.save();
    props.onHide();
  };
  return (
    <Modal
      show={props.show}
      size="lg"
      onHide={dismiss}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
	  <Modal.Body>{ReactHtmlParser(md.render(props.text))}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={dismiss}>
          Dismiss
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
