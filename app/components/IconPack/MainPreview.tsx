import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

type MyProps = {
  urls: Array<string>;
  id: string;
};

export default function MainPreview(props: MyProps) {
  const baseUrl = `https://d43kvaebi7up3.cloudfront.net/${encodeURIComponent(
    props.id
  )}`;
  const images = props.urls.map<React.ReactNode>((url, index) => {
    return (
      <Col key={`iconpack-mainpreview-img-${index}`}>
        <Image
          className="perk-preview-img"
          src={`${baseUrl}/${url}`}
          fluid
        />
      </Col>
    );
  });
  return <Row className="flex-nowrap">{images}</Row>;
}
