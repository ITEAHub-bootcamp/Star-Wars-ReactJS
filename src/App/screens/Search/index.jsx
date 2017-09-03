import React from 'react';
import PropTypes from 'prop-types';

import SearchPane from './components/SearchPane';
import Section from '../../../common/components/Section';
import Tiles from '../../../common/components/Tiles';
import Meter from '../../../common/components/Meter';
import Box from '../../../common/components/Box';
import Value from '../../../common/components/Value';
import ListPlaceholder from '../../../common/components/ListPlaceholder';

class Search extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isSearching: false,
      searchType: props.match.params.type,
      searchQuery: props.match.params.query,
      searchResult: {},
    };

    this.onTilesMore = this.onMore.bind(this);
  }

  componentDidMount() {
    const { params } = this.props.match;

    this.search(params.type, params.query);
  }

  componentWillReceiveProps(nextProps) {
    const { params } = nextProps.match;

    this.setState({
      isSearching: true,
      searchType: params.type,
      searchQuery: params.query,
    }, () => {
      this.onTilesMore = this.onMore.bind(this);

      this.search(params.type, params.query);
    });
  }

  onSearchResult(result) {
    if (!result.next) this.onTilesMore = null;

    this.setState({
      isSearching: false,
      searchResult: result,
    });
  }

  onMore() {
    this.searchMore(this.state.searchResult.next);
  }

  get searchTiles() {
    const { searchResult, searchType, searchQuery } = this.state;

    return this.state.searchResult.count ?
      <Tiles
        fill
        onMore={this.onTilesMore}
      >
        {
          searchResult.results.map(
            item => <SearchPane key={item.url} type={searchType} data={item} />,
          )
        }
      </Tiles> :
      <ListPlaceholder emptyMessage={`Cannot find "${searchQuery}" anything in ${searchType} collection. :(`} />;
  }

  get meter() {
    const { searchResult, searchType } = this.state;

    return searchResult.count ? (
      <Box align="center">
        <Meter value={(searchResult.results.length * 100) / searchResult.count} />
        <Value
          value={searchResult.results.length}
          units={searchType}
          align="center"
        />
      </Box>
    ) :
      null;
  }

  search(type, query) {
    window
      .fetch(`https://swapi.co/api/${type}/?search=${query}`)
      .then(res => res.json())
      .then(json => this.onSearchResult(json));
  }

  searchMore(nextUrl) {
    if (nextUrl && !this.state.isSearching) {
      this.setState({
        isSearching: true,
      }, () => {
        window
          .fetch(nextUrl)
          .then(res => res.json())
          .then((json) => {
            if (!json.next) this.onTilesMore = null;

            this.setState({
              isSearching: false,
              searchResult: {
                count: json.count,
                next: json.next,
                previous: json.previous,
                results: [...this.state.searchResult.results, ...json.results],
              },
            });
          });
      });
    }
  }

  render() {
    return (
      <Section>
        {this.searchTiles}
        {this.meter}
      </Section>
    );
  }
}

Search.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

export default Search;
