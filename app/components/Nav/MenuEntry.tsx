/* eslint-disable no-else-return */
import React, { Component, useState } from 'react';
import styled from 'styled-components';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';

type MyProps = {
  text: string;
  to: string;
  currentActive: string;
  image: string;
  icon: string;
  onClick: Function;
};

const ImageWrapper = styled.span`
  margin-right: 6px;
`;

export default function MenuEntry(props: MyProps) {
  const active = props.currentActive === props.to;
  const className = active ? 'menu-entry menu-entry-active' : 'menu-entry';
  if (props.image) {
    return (
      <Link
        className={className}
        to={props.to}
        onClick={() => {
          props.onClick(props.to);
        }}
      >
        <ImageWrapper>
          <Image src={props.image} className="menu-image" />
        </ImageWrapper>
        {props.text}
      </Link>
    );
  } else if (props.icon) {
    return (
      <Link
        className={className}
        to={props.to}
        onClick={() => {
          props.onClick(props.to);
        }}
      >
        <ImageWrapper>
          <i className={props.icon}></i>
        </ImageWrapper>
        {props.text}
      </Link>
    );
  } else {
    return (
      <Link
        className={className}
        to={props.to}
        onClick={() => {
          props.onClick(props.to);
        }}
      >
        {/* <CaretWrapper>
			<i className="fas fa-minus" />
		  </CaretWrapper> */}
        {props.text}
      </Link>
    );
  }
}
