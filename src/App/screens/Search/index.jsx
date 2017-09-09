import React from 'react';

import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';
import Box from 'grommet/components/Box';
import Value from 'grommet/components/Value';
import Meter from 'grommet/components/Meter';
import Anchor from 'grommet/components/Anchor';
import ErrorPage from '../../components/ErrorPage';

import imgBg from './assets/wpid-starwars_logo.jpg';

class Search extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      searchType: this.props.match.params.type,
      searchQuery: this.props.match.params.query,
      searchResult: {},
      loadedItemsCounter: 0,
      totalItemsCounter: 0,
      errorMsg: '',
    };
    this.apiUrl = 'https://swapi.co/api';
    this.loadMoreResults = this.loadMoreResults.bind(this);
  }

  componentDidMount() {
    const state = this.state;
    this.searchData(this.apiUrl, state.searchType, state.searchQuery);
  }

  componentWillReceiveProps(nextProps) {
    const updatedParams = nextProps.match;
    if (updatedParams.params.type !== this.props.match.params.type) {
      this.setState({ loadedItemsCounter: 0 });
    }
    if (updatedParams.params.query !== this.props.match.params.query) {
      this.setState({ loadedItemsCounter: 0, totalItemsCounter: 0 });
    }
    this.setState({
      searchType: updatedParams.params.type,
      searchQuery: updatedParams.params.query,
      searchResult: {},
    });
    const matchParams = this.props.match.params;
    this.searchData(this.apiUrl, matchParams.type, matchParams.query);
  }

  get searchErrorMsg() {
    return `No ${this.state.searchType} have been found...`;
  }

  get tile() {
    return this.state.searchResult.results && this.state.searchResult.results.length ?
      <div>
        <Tiles
          onMore={this.state.searchResult.next ? this.loadMoreResults : null}
          fill
        >
          {this.state.searchResult.results.map(item => (
            <Tile key={item.url}>
              <Anchor path={{ path: `/people/${item.url.split('/')[5]}`, index: true }}>
                <Card
                  thumbnail={imgBg}
                  heading={item.name}
                />
              </Anchor>
            </Tile>
          ))}
        </Tiles>
        <Box align="center">
          <Value
            value={this.state.loadedItemsCounter}
            size="small"
            align="start"
          />
          <Meter
            vertical={false}
            size="small"
            value={this.state.loadedItemsCounter}
            max={this.state.totalItemsCounter}
          />
        </Box>
      </div>
      :
      <ErrorPage textToDisplay={this.searchErrorMsg} />;
  }

  searchData(url, type, query) {
    window.fetch(`${url}/${type}/?search=${query}`)
      .then(res => res.json())
      .then(json => this.setState({
        searchResult: json,
        loadedItemsCounter: json.results.length,
        totalItemsCounter: json.count,
      }));
  }

  loadMoreResults() {
    window
      .fetch(`${this.state.searchResult.next}`)
      .then(res => res.json())
      .then(json => this.setState({
        searchResult: {
          results: this.state.searchResult.results.concat(json.results),
          next: json.next,
        },
        loadedItemsCounter: this.state.loadedItemsCounter + json.results.length,
      },
      ));
  }

  render() {
    return (
      <div>{this.tile}</div>
    );
  }
}

export default Search;
