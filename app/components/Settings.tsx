import React, { Component, useState } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes.json';
import styles from './Home.css';
import DeadByDaylight from '../steam/DeadByDaylight';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

export default function Settings() {
  const [count, setCount] = useState(0);

  return (
    <p>Settings</p>
  );
}
