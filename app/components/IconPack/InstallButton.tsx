import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

type MyProps = {
  installed: boolean;
  installInProgress: boolean;
  onClick: Function;
};

export default function PackInstallButton(props: MyProps) {
  return (
    <Button
      variant={props.installed ? 'secondary' : 'dark'}
      onClick={() => {
        props.onClick();
      }}
      className="m-1"
    >
      <Spinner
        as="span"
        animation="border"
        size="sm"
        role="status"
        aria-hidden="true"
        className="mr-2"
        hidden={!props.installInProgress}
      />
      {props.installed ? 'Installed' : 'Install'}
    </Button>
  );
}
