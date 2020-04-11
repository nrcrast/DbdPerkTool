import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';
import DeadByDaylight from '../steam/DeadByDaylight';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

type MyProps = {};
type MyState = { installPath: string };

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <p>my home page</p>
  );
}
