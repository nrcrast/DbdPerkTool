import React, { useState } from 'react';

type MyProps = {
  name: string;
  onClick: Function;
};

export default function LatestChapter(props: MyProps) {
  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        props.onClick();
      }}
    >
      {props.name}
    </a>
  );
}
