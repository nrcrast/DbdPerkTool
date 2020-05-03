import React, { Component, useState } from 'react';
import Row from 'react-bootstrap/Row';
import PerkPackMeta from '../PerkPack/PerkPackMeta';

type MyProps = {
  latestChapter: string;
  author: string;
  downloads: number;
  popularity: string;
  onAuthorClick: any;
};
type MyState = {};

export default function PortraitPackMeta(props: MyProps) {
  return (
    <PerkPackMeta
      latestChapter={props.latestChapter}
      author={props.author}
      downloads={props.downloads}
      popularity={props.popularity}
      onAuthorClick={props.onAuthorClick}
    />
  );
}
