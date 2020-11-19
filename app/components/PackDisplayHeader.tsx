import React, { useState, useEffect, useContext } from 'react';
import Form from 'react-bootstrap/Form';
import DropdownButton from 'react-bootstrap/DropdownButton';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useDebouncedCallback } from 'use-debounce';
import log from 'electron-log';
import styled from 'styled-components';
import { show } from '../app.bootstrap.min.css';
import UserContext from '../context/UserContext';

type MyProps = {
  onSortKeySet: Function;
  initialSortKey: string;
  onSearchFilter: Function;
  initialFilterText: string;
  onViewModeSet: Function;
  initialViewMode: string;
  onPageSizeSet: Function;
  initialPageSize: number;
  initialShowFavorites: boolean;
  onShowFavoritesSet: Function;
};

const Container = styled.div`
  display: flex;
  margin-bottom: 6px;
  flex-wrap: nowrap;
`;

const DropdownButtonWrapper = styled.div`
  margin-right: 3px;
`;

const ShowFavoritesWrapper = styled.div`
  padding-left: 8px;
  padding-right: 8px;
  display: flex;
  margin-left: auto;
  margin-right: auto;
`;

const ShowFavoritesStarWrapper = styled.span`
  color: #d4af37;
  margin-right: 4px;

  &:hover {
    color: yellow;
    cursor: pointer;
  }
`;

export default function PackDisplayHeader(props: MyProps) {
  const userContext = useContext(UserContext);
  const [searchText, setSearchText] = useState(props.initialFilterText);
  const [sortKeyText, setSortKeyText] = useState(props.initialSortKey);
  const [viewModeText, setViewModeText] = useState(props.initialViewMode);
  const [pageSizeText, setPageSizeText] = useState(props.initialPageSize);
  const [showFavorites, setShowFavorites] = useState(
    props.initialShowFavorites
  );

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

  const favoriteStarClass = showFavorites
    ? 'fas fa-star fa-lg'
    : 'far fa-star fa-lg';

  return (
    <Container>
      <DropdownButtonWrapper>
        <DropdownButton
          variant="secondary"
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
                  key={`sortkey-${sortKey}`}
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
      {/* <DropdownButtonWrapper>
        <DropdownButton
          variant="secondary"
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
                key={`viewMode-${viewMode}`}
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
      </DropdownButtonWrapper> */}
      <DropdownButtonWrapper>
        <DropdownButton
          variant="secondary"
          id="viewModeDropDown"
          title={`Packs Per Page (${pageSizeText})`}
        >
          {[6, 12, 18, 24, 48].map((pageSize: number) => {
            return (
              <NavDropdown.Item
                key={`pgsize-${pageSize}`}
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

      {userContext.user && (
        <ShowFavoritesWrapper>
          <ShowFavoritesStarWrapper
            onClick={() => {
              const newShowFavorites = !showFavorites;
              setShowFavorites(newShowFavorites);
              props.onShowFavoritesSet(newShowFavorites);
            }}
          >
            <i className={favoriteStarClass} />
          </ShowFavoritesStarWrapper>
          <h5>Show Favorites</h5>
        </ShowFavoritesWrapper>
      )}

      <Form.Control
        style={{
          maxWidth: '400px',
          minWidth: '100px',
          marginLeft: 'auto'
        }}
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
