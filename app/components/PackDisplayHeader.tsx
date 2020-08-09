import React, { useState, useEffect, memo } from 'react';
import Form from 'react-bootstrap/Form';
import DropdownButton from 'react-bootstrap/DropdownButton';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDebouncedCallback } from 'use-debounce';
import log from 'electron-log';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';

type MyProps = {
  onSortKeySet: Function;
  initialSortKey: string;
  onSearchFilter: Function;
  initialFilterText: string;
  onViewModeSet: Function;
  initialViewMode: string;
  onPageSizeSet: Function;
  initialPageSize: number;
  currentPage: number;
  numPages: number;
  onPageChange: Function;
};

const Container = styled.div`
  display: flex;
  margin-bottom: 0px;
`;

const DropdownButtonWrapper = styled.div`
  margin-right: 3px;
`;

const PaginatorWrapper = styled.div`
  margin-right: auto;
  margin-left: auto;
`;

export default function PackDisplayHeader(props: MyProps) {
  const [searchText, setSearchText] = useState(props.initialFilterText);
  const [sortKeyText, setSortKeyText] = useState(props.initialSortKey);
  const [viewModeText, setViewModeText] = useState(props.initialViewMode);
  const [pageSizeText, setPageSizeText] = useState(props.initialPageSize);

  // The idea here is to only actually run the search after the user is finished typing
  const [debounceSearchCallback] = useDebouncedCallback(text => {
    log.info(`Running search: ${text}`);
    props.onSearchFilter(text);
  }, 500);

  const setSortKey = (text: string) => {
    setSortKeyText(text);
    props.onSortKeySet(text);
  };

  const setViewMode = (text: string) => {
    setViewModeText(text);
    props.onViewModeSet(text);
  };

  const setSearchFilter = (text: string) => {
    setSearchText(text);
    debounceSearchCallback(text);
  };

  const setPageSize = (size: number) => {
    setPageSizeText(size);
    props.onPageSizeSet(size);
  };

  useEffect(() => setSearchText(props.initialFilterText), [
    props.initialFilterText
  ]);

  return (
    <Container>
      <DropdownButtonWrapper>
        <DropdownButton
          variant="dark"
          id="sortDropDown"
          title={
            <span>
              <i className="fas fa-sort-amount-down"></i> Sort ({sortKeyText})
            </span>
          }
        >
          {['Name', 'Downloads', 'Date', 'Author', 'Chapter'].map(
            (sortKey: string) => {
              return (
                <NavDropdown.Item
                  className="field-label-text"
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    setSortKey(sortKey);
                  }}
                >
                  {sortKey}
                </NavDropdown.Item>
              );
            }
          )}
        </DropdownButton>
      </DropdownButtonWrapper>
      <DropdownButtonWrapper>
        <DropdownButton
          variant="dark"
          id="viewModeDropDown"
          title={
            <span>
              <i className="fas fa-eye"></i> View Mode ({viewModeText})
            </span>
          }
        >
          {['Normal', 'Compact'].map((viewMode: string) => {
            return (
              <NavDropdown.Item
                className="field-label-text"
                href="#"
                onClick={e => {
                  e.preventDefault();
                  setViewMode(viewMode);
                }}
              >
                {viewMode}
              </NavDropdown.Item>
            );
          })}
        </DropdownButton>
      </DropdownButtonWrapper>
      <DropdownButtonWrapper>
        <DropdownButton
          variant="dark"
          id="viewModeDropDown"
          title={`Packs Per Page (${pageSizeText})`}
        >
          {[6, 12, 18, 24, 48].map((pageSize: number) => {
            return (
              <NavDropdown.Item
                className="field-label-text"
                href="#"
                onClick={(e: any) => {
                  e.preventDefault();
                  setPageSize(pageSize);
                }}
              >
                {pageSize}
              </NavDropdown.Item>
            );
          })}
        </DropdownButton>
      </DropdownButtonWrapper>
      <PaginatorWrapper>
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          pageCount={props.numPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          forcePage={props.currentPage}
          onPageChange={arg => {
            props.onPageChange(arg.selected);
          }}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          containerClassName={'pagination'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          activeClassName={'active'}
        />
      </PaginatorWrapper>
      <Form.Control
        style={{ maxWidth: '400px', minWidth: '100px', marginLeft: 'auto' }}
        type="text"
        placeholder="Search"
        className="mr-sm-2 dbd-input-field"
        onChange={e => {
          setSearchFilter(e.target.value);
        }}
        value={searchText}
      />
    </Container>
  );
}
