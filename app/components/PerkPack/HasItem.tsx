import React, { Component, useState } from 'react';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

type MyProps = {
  label: string;
  has: boolean;
};
type MyState = {};

export default function HasItem(props: MyProps) {
  return (
    <ListGroupItem>
      {props.label}:{'  '}
      {props.has ? (
        <i className="fas fa-check ml-2" />
      ) : (
        <i className="fas fa-times ml-2" />
      )}
    </ListGroupItem>
  );
}