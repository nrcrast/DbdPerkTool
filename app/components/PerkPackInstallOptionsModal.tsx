import React, { Component, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import PerkPackInstallOption from './PerkPackInstallOption';

type MyProps = { meta: any; show: boolean; onHide: any; onConfirm: any };
type MyState = {
  installPortraits: boolean;
  installPowers: boolean;
  installItems: boolean;
  installStatus: boolean;
  installMisc: boolean;
  installPerks: boolean;
};

export default class PerkPackInstallOptionsModal extends Component<
  MyProps,
  MyState
> {
  constructor(params: {}) {
    super(params);
    this.state = {
      installPortraits: true,
      installPowers: true,
      installItems: true,
      installStatus: true,
      installMisc: true,
      installPerks: true
    };
  }

  async componentDidUpdate(prevProps) {
    if (this.props.show !== prevProps.show) {
      this.setState({
        installPortraits: true,
        installPowers: true,
        installItems: true,
        installStatus: true,
        installMisc: true,
        installPerks: true
      });
    }
  }

  onConfirm() {
    this.props.onConfirm(this.state);
  }

  onHide() {
    this.props.onHide();
  }

  buildCheckboxes() {
    const checkboxes = [];

    checkboxes.push(
      <PerkPackInstallOption
        label="Perks"
        onChange={(checked: boolean) => {
          this.setState({ installPerks: checked });
        }}
      />
    );

    if (this.props.meta.hasPortraits) {
      checkboxes.push(
        <PerkPackInstallOption
          label="Portraits"
          onChange={(checked: boolean) => {
            this.setState({ installPortraits: checked });
          }}
        />
      );
    }

    if (this.props.meta.hasItems) {
      checkboxes.push(
        <PerkPackInstallOption
          label="Items"
          onChange={(checked: boolean) => {
            this.setState({ installItems: checked });
          }}
        />
      );
    }

    if (this.props.meta.hasStatusEffects) {
      checkboxes.push(
        <PerkPackInstallOption
          label="Status Effects"
          onChange={(checked: boolean) => {
            this.setState({ installStatus: checked });
          }}
        />
      );
    }

    if (this.props.meta.hasPowers) {
      checkboxes.push(
        <PerkPackInstallOption
          label="Powers"
          onChange={(checked: boolean) => {
            this.setState({ installPowers: checked });
          }}
        />
      );
    }

    checkboxes.push(
      <PerkPackInstallOption
        label="Misc (Offerings, Favors, Emblems, etc...)"
        onChange={(checked: boolean) => {
          this.setState({ installMisc: checked });
        }}
      />
    );

    return checkboxes;
  }

  render() {
    return (
      <Modal
        show={this.props.show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        onHide={this.props.onHide}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Choose Components To Install
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>{this.buildCheckboxes()}</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              this.onConfirm();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
