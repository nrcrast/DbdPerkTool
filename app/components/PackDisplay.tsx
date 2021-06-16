import React, { Component, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import nomar from 'nomar';
import log from 'electron-log';
import styled from 'styled-components';
import ReactPaginate from 'react-paginate';
import settingsUtil from '../settings/Settings';
import ErrorModal from './ErrorModal';
import SuccessModal from './SuccessModal';
import AuthorModal from './AuthorModal';
import PackDisplayHeader from './PackDisplayHeader';
import PackDisplayFilters from './PackDisplayFilters';
import UserContext from '../context/UserContext';
import api from '../api/Api';

axios.defaults.adapter = require('axios/lib/adapters/http');

type MyProps = {
  cardBuilder: any;
  installedPackSettingsKey: string;
  packs: any;
  showHeaderBar?: boolean;
  paginate?: boolean;
  featured?: boolean;
};

const DeckWrapper = styled.div`
  overflow-y: scroll;
  overflow-x: hidden;
  flex: 1;
`;

const PackDisplayContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const PaginatorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3px;
  padding: 3px;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

const SORT_KEY_MAP = {
  'Name': {key: 'name', dir: 'ascending'},
  'Date': {key: 'updatedAt', dir: 'descending'},
  'Downloads': {key: 'downloads', dir: 'descending'},
  'Chapter': {key: 'latestChapter', dir: 'ascending'},
  'Author': {key: 'author', dir: 'ascending'},
};

export default function PackDisplay(props: MyProps) {
  const [errorModalShow, setErrorModalShow] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [filters, setFilters] = useState([]);
  const [sortKey, setSortKey] = useState('Downloads');
  const [errorText, setErrorText] = useState('');
  const [showAuthorPage, setShowAuthorPage] = useState(false);
  const [currentAuthor, setCurrentAuthor] = useState('');
  const [viewMode, setViewMode] = useState('Normal');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(12);
  const [successModalShow, setSuccessModalShow] = useState(false);
  const [successModalText, setSuccessModalText] = useState('');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [packs, setPacks] = useState([]);
  const userContext = useContext(UserContext);
  const deckWrapperRef = React.createRef();

  const loadPacks = async () => {
    const capabilities = filters.length > 0 ? filters.join('|') : null;
    const params = {page: page + 1, limit: pageSize, capabilities};

    if(searchFilter) {
      params.search = searchFilter;
    }

    if(props.featured === true) {
      params.isFeatured = true;
    }

    if(favoritesOnly) {
      params.favorites = true;
    }

    const apiSortKey = SORT_KEY_MAP[sortKey];

    if(apiSortKey) {
      params.sort = apiSortKey.key;
      params.sortdir = apiSortKey.dir;
    }

    const packs = await api.getPacks(params);
    setPacks(packs);
  };

  useEffect(() => {
    loadPacks();
  }, [searchFilter, page, pageSize, filters, favoritesOnly, sortKey]);

  const fromCardsBuildDeck = cards => {
    return (
      <Row key="pack-cards" className="justify-content-center">
        {cards.map(card => (
          <Col key={`card-${uuidv4()}`} className="col-auto">
            {card}
          </Col>
        ))}
      </Row>
    );
  };

  const showHeaderBar = !(props.showHeaderBar === false);
  const paginate = !(props.paginate === false);
  const errorModalText = errorText;

  if(!packs.data) {
    return null;
  }

  const packElements = packs.data;

  const cards = props.cardBuilder(packElements, {
    viewMode: viewMode,
    onError: (msg: string) => {
      setErrorText(msg);
      setErrorModalShow(true);
    },
    onInstallComplete: (id: string) => {
      const pack = packElements.find(pack => pack.id === id);
      setSuccessModalText(`Pack ${pack.name} installed!`);
      setSuccessModalShow(true);
    },
    onAuthorClick: (author: string) => {
      setCurrentAuthor(author);
      setShowAuthorPage(true);
    },
    onSetFilter: (text: string) => {
      setPage(0);
      setSearchFilter(text);

    }
  });
  const deck = fromCardsBuildDeck(cards);

  const numPages = Math.ceil(packs.meta.totalDocs / pageSize);

  return (
    <PackDisplayContainer>
      {showHeaderBar && (
        <div>
          <PackDisplayHeader
            currentPage={page}
            numPages={numPages}
            initialPageSize={pageSize}
            initialSortKey={sortKey}
            initialViewMode={viewMode}
            onSearchFilter={(text: string) => {
              setPage(0);
              setSearchFilter(text);
            }}
            onSortKeySet={(text: string) => {
              setSortKey(text);
            }}
            initialFilterText={searchFilter}
            onViewModeSet={(mode: string) => {
              setViewMode(mode);
            }}
            onPageSizeSet={(size: number) => {
              setPage(0);
              setPageSize(size);
            }}
            onShowFavoritesSet={favoritesOnly => {
              setFavoritesOnly(favoritesOnly);
              setPage(0);
            }}
          />
          <PackDisplayFilters
            initialFilters={filters}
            onFiltersSet={(newFilters: [string]) => {
              setFilters(newFilters);
            }}
          />
        </div>
      )}

      <DeckWrapper ref={deckWrapperRef}>{deck}</DeckWrapper>
      {paginate && (
        <PaginatorWrapper>
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            pageCount={numPages}
            marginPagesDisplayed={1}
            pageRangeDisplayed={15}
            forcePage={page}
            onPageChange={arg => {
              deckWrapperRef.current.scrollTo(0, 0);
              setPage(arg.selected);
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
      )}
      <ErrorModal
        text={errorModalText}
        show={errorModalShow}
        onHide={() => setErrorModalShow(false)}
      />
      <SuccessModal
        title="Install Complete"
        text={successModalText}
        show={successModalShow}
        onHide={() => setSuccessModalShow(false)}
      />
      <AuthorModal
        show={showAuthorPage}
        author={currentAuthor}
        onHide={() => setShowAuthorPage(false)}
        onShowPacks={() => {
          setPage(0);
          setShowAuthorPage(false);
          setSearchFilter(currentAuthor);
        }}
      />
    </PackDisplayContainer>
  );
}
