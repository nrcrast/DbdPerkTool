import React, { Component, useState } from 'react';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

type MyProps = {
  label: string;
  has: boolean;
};
type MyState = {};

export default function HasItem(props: MyProps) {
  return (
    <span className="mb-2">
      <b>{props.label}</b>:{'  '}
      {props.has ? (
        <i className="has-item-check fas fa-check ml-2" />
      ) : (
        <i className="no-item-check  fas fa-times ml-2" />
      )}
    </span>
  );
}