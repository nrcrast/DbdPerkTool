import React, { Component, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Tree from 'rc-tree';
import axios from 'axios';
import getLanguage from '../../../language/Language';

type FileTreeNode = {
  key: string;
  title: string;
  children: Array<FileTreeNode>
};

type FileTree = Array<FileTreeNode>;

type MyProps = { meta: any; show: boolean; onHide: any; onConfirm: any };
type MyState = {
  installPortraits: boolean;
  installPowers: boolean;
  installItems: boolean;
  installStatus: boolean;
  installMisc: boolean;
  installPerks: boolean;
  installOfferings: boolean;
  fileTree: FileTree;
  checkedKeys: Array<string>;
  allKeys: Array<string>;
};

export default class PerkPackInstallOptionsModal extends Component<
  MyProps,
  MyState
> {
  constructor(params: MyProps) {
    super(params);
    this.state = {
      installPortraits: true,
      installPowers: true,
      installItems: true,
      installStatus: true,
      installMisc: true,
      installPerks: true,
      installOfferings: true,
      fileTree: [],
      checkedKeys: [],
      allKeys: []
    };
  }

  async componentDidUpdate(prevProps: MyProps) {
    if (this.props.show !== prevProps.show) {
      const packDetails = (
        await axios.get(
          'https://dead-by-daylight-icon-toolbox.herokuapp.com/pack',
          {
            params: {
              packId: this.props.meta.id,
              download: false
            }
          }
        )
      ).data;
      this.buildTreeDataFrom(packDetails.files);
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
    const selectedImages = this.state.checkedKeys.filter(key =>
      key.endsWith('.png')
    );
    this.props.onConfirm(selectedImages);
  }

  onHide() {
    this.props.onHide();
  }

  onCheck(checkedKeys: Array<string>) {
    this.setState({ checkedKeys });
  }

  buildTreeDataFrom(fileList: Array<string>) {
    const tree:FileTree = [];
    const checkedKeys:Array<string> = [];

    fileList.forEach(file => {
      const parent = file.slice(0, file.indexOf('/'));
      const icon = file.slice(file.indexOf('/') + 1);

      let parentNode = tree.find(node => node.key === parent);

      if (!parentNode) {
        tree.push({
          key: parent,
          title: getLanguage(parent) || parent,
          children: []
        });
        parentNode = tree[tree.length - 1];
        checkedKeys.push(parent);
      }

      parentNode.children.push({
        key: file,
        title: getLanguage(file) || icon,
        children: []
      });
      checkedKeys.push(file);
    });

    // Sort by root
    tree.sort((a, b) => a.title.localeCompare(b.title));

    tree.forEach(child => {
      child.children.sort((a, b) => a.title.localeCompare(b.title));
    });

    this.setState({ fileTree: tree, checkedKeys, allKeys: [...checkedKeys] });
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
          <Tree
            className="myCls"
            showLine
            checkable
            selectable={false}
            checkedKeys={this.state.checkedKeys}
            onCheck={this.onCheck.bind(this)}
            treeData={this.state.fileTree}
          />
        </Modal.Body>
        <Modal.Footer>
          <div style={{ marginRight: 'auto' }}>
            <Button
              style={{ marginRight: '3px' }}
              onClick={() => {
                this.setState({ checkedKeys: [] });
              }}
            >
              Select None
            </Button>
            <Button
              onClick={() => {
                this.setState({ checkedKeys: [...this.state.allKeys] });
              }}
            >
              Select All
            </Button>
          </div>
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
