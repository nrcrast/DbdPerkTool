import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel';

type MyProps = {
  urls: Array<string>;
  id: string;
  viewMode: string;
};

export default function MainPreview(props: MyProps) {
  const baseUrl = `https://d43kvaebi7up3.cloudfront.net/${encodeURIComponent(
    props.id
  )}`;
  if (props.viewMode === 'Normal') {
    const images = props.urls.map<React.ReactNode>((url, index) => {
      return (
        <Col key={`iconpack-mainpreview-img-${index}`}>
          <Image className="perk-preview-img" src={`${baseUrl}/${url}`} fluid />
        </Col>
      );
    });
    return <Row className="flex-nowrap">{images}</Row>;
  } else {
    const images = props.urls.map<React.ReactNode>((url, index) => {
      return (
        <Carousel.Item key={`iconpack-mainpreview-${props.id}-img-${index}`}>
          <Image className="perk-preview-img-compact" src={`${baseUrl}/${url}`} fluid/>
        </Carousel.Item>
      );
    });
    return (
      <Carousel indicators={false} key={`carousel-${props.id}`} interval={null} slide={false}>
        {images}
      </Carousel>
    );
  }
}
