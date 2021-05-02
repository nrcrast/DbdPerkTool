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

axios.defaults.adapter = require('axios/lib/adapters/http');

type MyProps = {
  cardBuilder: any;
  installedPackSettingsKey: string;
  packs: any;
  showHeaderBar?: boolean;
  paginate?: boolean;
};
type MyState = {
  errorModalShow: boolean;
  isLoading: boolean;
  searchFilter: string;
  currentAuthor: string;
  showAuthorPage: boolean;
  sortKey: string;
  errorText: string;
  viewMode: string;
  packs: Array<any>;
  page: number;
  pageSize: number;
  successModalShow: boolean;
  successModalText: string;
  favoritesOnly: boolean;
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

function strcmpIgnoreCase(a, b) {
  return a.toUpperCase().localeCompare(b.toUpperCase());
}

function getPackChapterNum(pack) {
  const latestChapterMatch = pack.latestChapter.match(/Chapter (.*): .*/);
  if (!latestChapterMatch || latestChapterMatch.length < 2) {
    return 0;
  } else {
    const lastChapterRomanStr = latestChapterMatch[1];
    return nomar(lastChapterRomanStr);
  }
}

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
  const userContext = useContext(UserContext);
  const deckWrapperRef = React.createRef();

  const doSearchFilter = (text: string) => {
    const escapedRegex = searchFilter.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    return text.search(new RegExp(escapedRegex, 'i')) >= 0;
  };

  const isPackIncluded = pack => {
    let show = false;

    if (userContext.user == null) {
      show = true;
    } else if (favoritesOnly) {
      show = userContext.user.favorites.find(
        favoritePack => favoritePack.id === pack.id
      );
    } else {
      show = true;
    }

    // If the pack went through the favorites filter
    if (show) {
      // Assume we're not showing it
      show = false;
      if (searchFilter === '') {
        show = true;
      } else if (
        doSearchFilter(pack.name) ||
        doSearchFilter(pack.author) ||
        doSearchFilter(pack.description) ||
        doSearchFilter(pack.latestChapter)
      ) {
        show = true;
      }
    }

    // Handle filter checkboxes
    if (show) {
      for (let i = 0; i < filters.length; i += 1) {
        if (filters[i] === 'misc') {
          if (
            !(
              pack.hasArchive ||
              pack.hasBanners ||
              pack.hasRituals ||
              pack.hasEmblems ||
              pack.hasEvents ||
              pack.hasHelp ||
              pack.hasHelpLoading ||
              pack.hasStoreBackgrounds ||
              pack.hasStoreTabs
            )
          ) {
            show = false;
            break;
          }
        } else {
          if (pack[filters[i]] !== true) {
            show = false;
            break;
          }
        }
      }
    }

    return show;
  };

  const fromCardsBuildDeck = cards => {
    const startIndex = page * pageSize;
    const endIndex = Math.min(startIndex + pageSize, cards.length);
    const paginatedCards = cards.slice(startIndex, endIndex);
    return (
      <Row key="pack-cards" className="justify-content-center">
        {paginatedCards.map(card => (
          <Col key={`card-${uuidv4()}`} className="col-auto">
            {card}
          </Col>
        ))}
      </Row>
    );
  };

  const packSortComparator = (a, b) => {
    const key = sortKey;
    // // Featured packs always take precedence
    // if (a.featured && !b.featured) {
    //   return -1;
    // } else if (b.featured && !a.featured) {
    //   return 1;
    // }

    if (key === 'Name') {
      return strcmpIgnoreCase(a.name, b.name);
    } else if (key === 'Author') {
      return strcmpIgnoreCase(a.author, b.author);
    } else if (key === 'Downloads') {
      return a.downloads > b.downloads ? -1 : 1;
    } else if (key === 'Chapter') {
      return getPackChapterNum(a) > getPackChapterNum(b) ? -1 : 1;
    }

    const aDate = new Date(a.lastUpdate);
    const bDate = new Date(b.lastUpdate);
    return aDate > bDate ? -1 : aDate < bDate ? 1 : 0;
  };

  const showHeaderBar = !(props.showHeaderBar === false);
  const paginate = !(props.paginate === false);
  const errorModalText = errorText;

  const packs = [...props.packs];
  packs.sort(packSortComparator);

  const filteredPacks = packs.filter(pack => isPackIncluded(pack));
  const cards = props.cardBuilder(filteredPacks, {
    viewMode: viewMode,
    onError: (msg: string) => {
      setErrorText(msg);
      setErrorModalShow(true);
    },
    onInstallComplete: (id: string) => {
      const pack = packs.find(pack => pack.id === id);
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

  return (
    <PackDisplayContainer>
      {showHeaderBar && (
        <div>
          <PackDisplayHeader
            currentPage={page}
            numPages={Math.ceil(cards.length / pageSize)}
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
            pageCount={Math.ceil(cards.length / pageSize)}
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
