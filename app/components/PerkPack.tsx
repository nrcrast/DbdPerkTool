import React, { Component, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

type MyProps = {
  headerImg: string;
  author: string;
  name: string;
  id:string;
  installed: boolean;
  downloads: number;
  popularity: string;
  installPack: any;
};
type MyState = {installed: boolean};

export default class PerkPack extends Component<MyProps, MyState> {
  constructor(params: MyProps) {
	super(params);
  }

  async installPack() {
	  return this.props.installPack(this.props.id);
  }

  render() {
	  let installBtn;

	  if(this.props.installed) {
		  installBtn = <Button variant="secondary" disabled>Installed</Button>
	  } else {
		installBtn = <Button variant="primary" onClick={this.installPack.bind(this)}>Install</Button>
	  }
    return (
      <Card className="mb-3 text-center shadow">
        <Card.Img variant="top" src={this.props.headerImg} />

        <Card.Title>{this.props.name}</Card.Title>

        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Row className="justify-content-center">
          <ListGroup horizontal>
            <ListGroupItem>Author: {this.props.author}</ListGroupItem>
            <ListGroupItem>Downloads: {this.props.downloads}</ListGroupItem>
            <ListGroupItem>Popularity: {this.props.popularity}</ListGroupItem>
          </ListGroup>
        </Row>
        <Card.Body>
          {installBtn}
        </Card.Body>
      </Card>
    );
  }
}
