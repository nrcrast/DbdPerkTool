import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Carousel from 'react-bootstrap/Carousel';
import uuid from 'react-uuid';
import styled from 'styled-components';
import NsfwWarning from './NsfwWarning';

type MyProps = {
  urls: Array<string>;
  id: string;
  viewMode: string;
  baseUrl: string;
  isNsfw: boolean;
};

const ImageContainer = styled.div`
  display: flex;
  position: relative;
  text-align: center;
`;

const TextCentered = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-shadow: 2px 2px 4px #000000, -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
`;

function buildNormalPreview(props: MyProps, additionalImgClasses: string) {
  const imageClass = `perk-preview-img${additionalImgClasses}`;
  const images = props.urls.map<React.ReactNode>((url, index) => {
    return (
      <Col key={uuid()}>
        <Image className={imageClass} src={`${props.baseUrl}${url}`} fluid />
      </Col>
    );
  });
  return (
    <Row className="flex-nowrap">
      <ImageContainer>
        {images}{' '}
        {props.isNsfw && (
          <TextCentered>
            <NsfwWarning />
          </TextCentered>
        )}
      </ImageContainer>
    </Row>
  );
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
    <ImageContainer>
      <Carousel indicators={false} key={uuid()} interval={null} slide={false}>
        {images}
      </Carousel>

      {props.isNsfw && (
        <TextCentered>
          <NsfwWarning />
        </TextCentered>
      )}
    </ImageContainer>
  );
}

export default function MainPreview(props: MyProps) {
  let content;
  const additionalImgClasses =
    props.isNsfw ? ' img-blurred' : '';

  if (props.viewMode === 'Normal') {
    content = buildNormalPreview(props, additionalImgClasses);
  } else {
    content = buildCompactPreview(props, additionalImgClasses);
  }

  return content;
}
