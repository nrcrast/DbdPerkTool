import React, { Component, useState } from 'react';
import Form from 'react-bootstrap/Form';
import slugify from '@sindresorhus/slugify';

export default function PerkPackInstallOption(props: any) {
  return (
    <Form.Check
      defaultChecked
      type="checkbox"
      id={`${slugify(props.label)}-checkbox`}
      label={props.label}
      onChange={e => {
        props.onChange(e.target.checked);
      }}
    />
  );
}
