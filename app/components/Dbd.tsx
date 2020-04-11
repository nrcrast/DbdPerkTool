import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import styles from './Counter.css';
import routes from '../constants/routes.json';
import DeadByDaylight from '../steam/DeadByDaylight';

type MyProps = {};
type MyState = { installPath: string };

export default class Dbd extends Component<MyProps, MyState> {
  constructor(params: {}) {
    super(params);
    console.log('Constructor time boi');
    this.state = {
      installPath: ''
    };
  }

  async componentDidMount() {
    const dbd = new DeadByDaylight();
    const installPath = await dbd.getInstallPath();
    this.setState({
      installPath
    });
  }

  render() {
    const { installPath } = this.state;
    return (
      <div>
        <button type="button" className="btn btn-outline-dark">
          <Link to={routes.HOME}>
            <h2>Home</h2>
          </Link>
        </button>
        <h3>Install Path: {installPath}</h3>
      </div>
    );
  }
}
