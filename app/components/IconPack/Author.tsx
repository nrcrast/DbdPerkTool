import React, { useState } from 'react';

type MyProps = {
  name: string;
  onClick: Function;
};

export default function Author(props: MyProps) {
  const authorLinks = props.name.split(/\+|&/).map(author => author.trim()).map<React.ReactNode>((author, index) => {
    const authorTrimmed = author.trim();
    return (
      <a
		key={`author-${index}`}
        href="#"
        onClick={e => {
          e.preventDefault();
          props.onClick(authorTrimmed);
        }}
      >
        {authorTrimmed}
      </a>
    );
  });

  return <span>{authorLinks.reduce((prev, curr) => [prev, ' + ', curr])}</span>;
}
