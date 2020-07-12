import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';

type MyProps = {
  name: string;
  isFeatured: boolean;
};

export default function Title(props: MyProps) {
  if (props.isFeatured) {
    return (
      <Card.Title>
        <div className="ribbon-wrapper">
          <div class="ribbon">Featured</div>
        </div>
        {props.name}
      </Card.Title>
    );
  } else {
    return <Card.Title>{props.name}</Card.Title>;
  }
}
