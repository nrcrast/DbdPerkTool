import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import nomar from 'nomar';
import settingsUtil from '../settings/Settings';
import ErrorModal from './ErrorModal';
import AuthorModal from './AuthorModal';
import PackDisplayHeader from './PackDisplayHeader';
import ReactPaginate from 'react-paginate';
import log from 'electron-log';

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
  installedPack: string;
};

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
      installedPack: ''
    };
  }

  async componentDidMount() {
    // Get packs
    const packs = await axios.get(
      'https://dead-by-daylight-icon-toolbox.herokuapp.com/packs',
      { params: this.props.packQuery || undefined }
    );
    const installedPack =
      settingsUtil.settings[this.props.installedPackSettingsKey] || '';
    this.setState({
      installedPack,
      packs: packs.data,
      isLoading: false
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
    return (
      <Row key="pack-cards" className="justify-content-center">
        {cards.map(card => (
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
    const { installedPack } = this.state;
    packs.sort(this.packSortComparator.bind(this));

    const filteredPacks = packs
      .filter(pack => this.isPackIncluded(pack))
      .map(pack => {
        pack.isInstalled = installedPack === pack.id;
        return pack;
      });
    const cards = this.props.cardBuilder(filteredPacks, {
      viewMode: this.state.viewMode,
      onError: (msg: string) => {
        this.setState({ errorText: msg, errorModalShow: true });
      },
      onInstallComplete: (id: string) => {
        this.setState({ installedPack: id });
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
      <div style={{width: '100%'}}>
        <PackDisplayHeader
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
        />
        {deck}
        {/* <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={8}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={() => {
            log.info('Page clicked...');
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
        /> */}
        <ErrorModal
          title={errorModalTitle}
          text={errorModalText}
          show={this.state.errorModalShow}
          onHide={() => this.setState({ errorModalShow: false })}
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
      </div>
    );
  }
}
