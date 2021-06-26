import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

type MyProps = {
  installInProgress: boolean;
  onClick: Function;
  progressText?: string;
};

export default function PackInstallButton(props: MyProps) {
  let label = 'Install';

  if(props.installInProgress && props.progressText) {
    label += ` (${props.progressText})`;
  }
  return (
    <Button
      variant="secondary"
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
      {label}
    </Button>
  );
}
