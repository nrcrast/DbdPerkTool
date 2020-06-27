import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import DropdownButton from 'react-bootstrap/DropdownButton';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Col from 'react-bootstrap/Col';
import { useDebouncedCallback } from 'use-debounce';
import log from 'electron-log';

type MyProps = { onSortKeySet: Function; onSearchFilter: Function; initialFilterText: string };

export default function PackDisplayHeader(props: MyProps) {
  console.log('Initial: ' + props.initialFilterText);
  const [searchText, setSearchText] = useState(props.initialFilterText);
  const [sortKeyText, setSortKeyText] = useState('Downloads');

  // The idea here is to only actually run the search after the user is finished typing
  const [debounceSearchCallback] = useDebouncedCallback(text => {
    log.info(`Running search: ${text}`);
    props.onSearchFilter(text);
  }, 250);

  const setSortKey = (text: string) => {
    setSortKeyText(text);
    props.onSortKeySet(text);
  };

  const setSearchFilter = (text: string) => {
    setSearchText(text);
    debounceSearchCallback(text);
  };

  useEffect(() => setSearchText(props.initialFilterText), [props.initialFilterText]);

  return (
    <Form.Group>
      <Form.Row className="justify-content-center">
        <Col>
          <DropdownButton
            variant="dark"
            id="sortDropDown"
            title={
              <span>
                <i className="fas fa-sort-amount-down"></i> Sort ({sortKeyText})
              </span>
            }
          >
            <NavDropdown.Item
              className="field-label-text"
              href="#"
              onClick={e => {
                e.preventDefault();
                setSortKey('Name');
              }}
            >
              Name (A-Z)
            </NavDropdown.Item>
            <NavDropdown.Item
              className="field-label-text"
              href="#"
              onClick={e => {
                e.preventDefault();
                setSortKey('Downloads');
              }}
            >
              Downloads
            </NavDropdown.Item>
            <NavDropdown.Item
              className="field-label-text"
              href="#"
              onClick={e => {
                e.preventDefault();
                setSortKey('Author');
              }}
            >
              Author (A-Z)
            </NavDropdown.Item>
            <NavDropdown.Item
              className="field-label-text"
              href="#"
              onClick={e => {
                e.preventDefault();
                setSortKey('Date');
              }}
            >
              Date (newest first)
            </NavDropdown.Item>
            <NavDropdown.Item
              className="field-label-text"
              href="#"
              onClick={e => {
                e.preventDefault();
                setSortKey('Chapter');
              }}
            >
              Chapter (newest first)
            </NavDropdown.Item>
          </DropdownButton>
        </Col>
        <Col>
          <Form.Control
            type="text"
            placeholder="Search"
            className="mr-sm-2 dbd-input-field"
            onChange={e => {
              setSearchFilter(e.target.value);
            }}
            value={searchText}
          />
        </Col>
      </Form.Row>
    </Form.Group>
  );
}
