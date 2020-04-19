import React from 'react';
import { Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import { Store } from '../reducers/types';
import Routes from '../Routes';
import routes from '../constants/routes.json';
import TopNav from '../components/TopNav';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

type Props = {
  store: Store;
  history: History;
};

const Root = ({ store, history }: Props) => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
    <TopNav />
      <Container fluid>
        <Row className="main-content rounded shadow p-3 m-3 justify-content-center">
          <Routes />
        </Row>
      </Container>
    </ConnectedRouter>
  </Provider>
);

export default hot(Root);
