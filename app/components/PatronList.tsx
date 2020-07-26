import React, { useState, useEffect } from 'react';
import slugify from '@sindresorhus/slugify';

type MyProps = {};

export default function PatronList(props: MyProps) {
  const patronList = ['WEIRDONINJATACO'].map<React.ReactNode>(patron => {
    return (
      <p key={`patron-${slugify(patron)}`} className="text-center">
        <small>{patron}</small>
      </p>
    );
  });
  return (
    <div>
      <h4 className="text-center">❤️Special thanks to❤️</h4>
      {patronList}
    </div>
  );
}
