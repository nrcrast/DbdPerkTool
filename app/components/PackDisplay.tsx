import React, { Component } from 'react';
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


axios.defaults.adapter = require('axios/lib/adapters/http');

type MyProps = {
  cardBuilder: any;
  installedPackSettingsKey: string;
  packQuery: any;
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
  background: rgba(48, 48, 48, 0.5);
`;

export default class PackDisplay extends Component<MyProps, MyState> {
  constructor(params: {}) {
    super(params);
    this.state = {
      errorModalShow: false,
      isLoading: true,
      searchFilter: '',
      sortKey: 'Downloads',
      errorText: '',
      showAuthorPage: false,
      currentAuthor: '',
      viewMode: 'Normal',
      packs: [],
      page: 0,
      pageSize: 12,
      successModalShow: false,
      successModalText: ''
    };
  }

  async componentDidMount() {
    // Get packs
    const packs = await axios.get(
      'https://dead-by-daylight-icon-toolbox.herokuapp.com/packs',
      { params: this.props.packQuery || undefined }
    );
    this.setState({
      isLoading: false,
      packs: packs.data,
    });
  }

  chunkArray(myArray: Array<any>, chunkSize: number) {
    const arrayLength = myArray.length;
    const tempArray = [];

    for (let index = 0; index < arrayLength; index += chunkSize) {
      const myChunk = myArray.slice(index, index + chunkSize);
      // Do something if you want with the group
      tempArray.push(myChunk);
    }

    return tempArray;
  }

  searchFilter(text: string) {
    const escapedRegex = this.state.searchFilter.replace(
      /[-\/\\^$*+?.()|[\]{}]/g,
      '\\$&'
    );
    return text.search(new RegExp(escapedRegex, 'i')) >= 0;
  }

  isPackIncluded(pack) {
    if (this.state.searchFilter === '') {
      return true;
    } else if (
      this.searchFilter(pack.name) ||
      this.searchFilter(pack.author) ||
      this.searchFilter(pack.description) ||
      this.searchFilter(pack.latestChapter)
    ) {
      return true;
    }
    return false;
  }

  strcmpIgnoreCase(a, b) {
    return a.toUpperCase().localeCompare(b.toUpperCase());
  }

  getPackChapterNum(pack) {
    const latestChapterMatch = pack.latestChapter.match(/Chapter (.*): .*/);
    if (!latestChapterMatch || latestChapterMatch.length < 2) {
      return 0;
    } else {
      const lastChapterRomanStr = latestChapterMatch[1];
      return nomar(lastChapterRomanStr);
    }
  }

  packSortComparator(a, b) {
    const key = this.state.sortKey;

    // Featured packs always take precedence
    if (a.featured && !b.featured) {
      return -1;
    } else if (b.featured && !a.featured) {
      return 1;
    }

    if (key === 'Name') {
      return this.strcmpIgnoreCase(a.name, b.name);
    } else if (key === 'Author') {
      return this.strcmpIgnoreCase(a.author, b.author);
    } else if (key === 'Downloads') {
      return a.downloads > b.downloads ? -1 : 1;
    } else if (key === 'Chapter') {
      return this.getPackChapterNum(a) > this.getPackChapterNum(b) ? -1 : 1;
    }

    const aDate = new Date(a.lastUpdate);
    const bDate = new Date(b.lastUpdate);
    return aDate > bDate ? -1 : aDate < bDate ? 1 : 0;
  }

  fromCardsBuildDeck(cards) {
    const startIndex = this.state.page * this.state.pageSize;
    const endIndex = Math.min(startIndex + this.state.pageSize, cards.length);
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
  }

  render() {
    if (this.state.isLoading) {
      return (
        <Spinner
          as="span"
          animation="border"
          role="status"
          aria-hidden="true"
          className="mr-2"
          hidden={!this.state.isLoading}
        />
      );
    }
    const errorModalTitle = 'Error';
    const errorModalText = this.state.errorText;

    const { packs } = this.state;
    packs.sort(this.packSortComparator.bind(this));

    const filteredPacks = packs.filter(pack => this.isPackIncluded(pack));
    const cards = this.props.cardBuilder(filteredPacks, {
      viewMode: this.state.viewMode,
      onError: (msg: string) => {
        this.setState({ errorText: msg, errorModalShow: true });
      },
      onInstallComplete: (id: string) => {
        const pack = this.state.packs.find(pack => pack.id === id);
        this.setState({
          successModalShow: true,
          successModalText: `Pack ${pack.name} installed!`
        });
      },
      onAuthorClick: (author: string) => {
        this.setState({ showAuthorPage: true, currentAuthor: author });
      },
      onSetFilter: (text: string) => {
        this.setState({ searchFilter: text });
      }
    });
    const deck = this.fromCardsBuildDeck(cards);

    return (
      <PackDisplayContainer>
        <PackDisplayHeader
          currentPage={this.state.page}
          numPages={Math.ceil(cards.length / this.state.pageSize)}
          initialPageSize={this.state.pageSize}
          initialSortKey={this.state.sortKey}
          initialViewMode={this.state.viewMode}
          onSearchFilter={(text: string) => {
            this.setState({ searchFilter: text });
          }}
          onSortKeySet={(text: string) => {
            this.setState({ sortKey: text });
          }}
          initialFilterText={this.state.searchFilter}
          onViewModeSet={(mode: string) => {
            this.setState({ viewMode: mode });
          }}
          onPageSizeSet={(size: number) => {
            this.setState({ pageSize: size, page: 0 });
          }}
          onPageChange={(page: number) => {
            this.setState({ page });
          }}
        />
        <DeckWrapper>{deck}</DeckWrapper>
        <PaginatorWrapper>
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            pageCount={Math.ceil(cards.length / this.state.pageSize)}
            marginPagesDisplayed={1}
            pageRangeDisplayed={15}
            forcePage={this.state.page}
            onPageChange={arg => {
              this.setState({ page: arg.selected });
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
        <ErrorModal
          title={errorModalTitle}
          text={errorModalText}
          show={this.state.errorModalShow}
          onHide={() => this.setState({ errorModalShow: false })}
        />
        <SuccessModal
          title="Install Complete"
          text={this.state.successModalText}
          show={this.state.successModalShow}
          onHide={() => this.setState({ successModalShow: false })}
        />
        <AuthorModal
          show={this.state.showAuthorPage}
          author={this.state.currentAuthor}
          onHide={() => this.setState({ showAuthorPage: false })}
          onShowPacks={() => {
            this.setState({
              showAuthorPage: false,
              searchFilter: this.state.currentAuthor
            });
          }}
        />
      </PackDisplayContainer>
    );
  }
}
