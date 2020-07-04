import React, { useState, useEffect } from 'react';

type MyProps = {};

export default function PatronList(props: MyProps) {
  const patronList = ['WEIRDONINJATACO'].map<React.ReactNode>((patron) => {
	return (<p className="text-center">
		<small>{patron}</small>
	</p>)
  });
  return (
    <div>
      <h4 className="text-center">❤️Special thanks to❤️</h4>
      {patronList}
    </div>
  );
}
