import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel';
import settingsUtil from '../../settings/Settings';
import uuid from 'react-uuid';

type MyProps = {
  urls: Array<string>;
  id: string;
  viewMode: string;
  baseUrl: string;
  isNsfw: boolean;
};

function buildNormalPreview(props: MyProps, additionalImgClasses: string) {
  const imageClass = `perk-preview-img${additionalImgClasses}`;
  const images = props.urls.map<React.ReactNode>((url, index) => {
    return (
      <Col key={uuid()}>
        <Image className={imageClass} src={`${props.baseUrl}${url}`} fluid />
      </Col>
    );
  });
  return <Row className="flex-nowrap">{images}</Row>;
}

function buildCompactPreview(props: MyProps, additionalImgClasses: string) {
  const imageClass = `perk-preview-img-compact${additionalImgClasses}`;
  const images = props.urls.map<React.ReactNode>((url, index) => {
    return (
      <Carousel.Item key={uuid()}>
        <Image className={imageClass} src={`${props.baseUrl}${url}`} fluid />
      </Carousel.Item>
    );
  });
  return (
    <Carousel
      indicators={false}
      key={uuid()}
      interval={null}
      slide={false}
    >
      {images}
    </Carousel>
  );
}

export default function MainPreview(props: MyProps) {
  let content;
  const additionalImgClasses = props.isNsfw && !settingsUtil.settings.showNsfw ? ' img-blurred' : '';

  if (props.viewMode === 'Normal') {
    content = buildNormalPreview(props, additionalImgClasses);
  } else {
    content = buildCompactPreview(props, additionalImgClasses);
  }

  return content;
}
