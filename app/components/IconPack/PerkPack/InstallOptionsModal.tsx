import React, { Component, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InstallOption from './InstallOption';

type MyProps = { meta: any; show: boolean; onHide: any; onConfirm: any };
type MyState = {
  installPortraits: boolean;
  installPowers: boolean;
  installItems: boolean;
  installStatus: boolean;
  installMisc: boolean;
  installPerks: boolean;
  installOfferings: boolean;
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
      installPerks: true,
      installOfferings: true
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
        installPerks: true,
        installOfferings: true
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
      <InstallOption
        key="perpackinstallopt-perks"
        label="Perks"
        onChange={(checked: boolean) => {
          this.setState({ installPerks: checked });
        }}
      />
    );

    if (this.props.meta.hasPortraits) {
      checkboxes.push(
        <InstallOption
          key="perpackinstallopt-portraits"
          label="Portraits"
          onChange={(checked: boolean) => {
            this.setState({ installPortraits: checked });
          }}
        />
      );
    }

    if (this.props.meta.hasItems) {
      checkboxes.push(
        <InstallOption
          key="perpackinstallopt-items"
          label="Items"
          onChange={(checked: boolean) => {
            this.setState({ installItems: checked });
          }}
        />
      );
    }

    if (this.props.meta.hasStatusEffects) {
      checkboxes.push(
        <InstallOption
          key="perpackinstallopt-status"
          label="Status Effects"
          onChange={(checked: boolean) => {
            this.setState({ installStatus: checked });
          }}
        />
      );
    }

    if (this.props.meta.hasPowers) {
      checkboxes.push(
        <InstallOption
          key="perpackinstallopt-powers"
          label="Powers"
          onChange={(checked: boolean) => {
            this.setState({ installPowers: checked });
          }}
        />
      );
    }

    if (this.props.meta.hasFavors) {
      checkboxes.push(
        <InstallOption
          key="perpackinstallopt-favors"
          label="Offerings"
          onChange={(checked: boolean) => {
            this.setState({ installOfferings: checked });
          }}
        />
      );
    }

    checkboxes.push(
      <InstallOption
        key="perpackinstallopt-misc"
        label="Misc (Emblems, Actions, etc...)"
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
