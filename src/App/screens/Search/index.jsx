import React from 'react';
import { connect } from 'react-redux';

import Section from 'grommet/components/Section';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';
import Box from 'grommet/components/Box';
import Value from 'grommet/components/Value';
import Meter from 'grommet/components/Meter';
import Anchor from 'grommet/components/Anchor';
import ErrorPage from '../../components/ErrorPage';

import { searchSwapi, loadNextResults } from '../../actions/searchResults';

import imgBg from './assets/wpid-starwars_logo.jpg';

class Search extends React.Component {

  componentDidMount() {
    this.props.searchSwapi();
  }

  componentWillReceiveProps(nextProps) {
    const { type, query } = this.props.search;
    if (nextProps.search.type !== type || nextProps.search.query !== query) {
      this.props.searchSwapi();
    }
  }

  get searchErrorMsg() {
    return `No ${this.props.search.type} have been found...`;
  }

  get tile() {
    const { results, count, fetching } = this.props.searchResults;

    return (
      <Tiles
        onMore={ !fetching && results.length < count ? this.props.loadNextResults : null }
        fill
      >
        {results.map(item => (
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
      )
  }

  get meter() {
    const { type } = this.props.search;
    const { results, count } = this.props.searchResults;

    return count ? (
      <Box align="center">
        <Value
          value={results.length}
          units={type}
          size="small"
          align="start"
        />
        <Meter
          vertical={false}
          size="small"
          value={results.length}
          max={count}
        />
      </Box>
    ) : null;
  }

  render() {
    const { count, fetching } = this.props.searchResults;

    return (
      <Section>
        <Box>
          { (!count && !fetching) ? <ErrorPage textToDisplay={this.searchErrorMsg}/> : null }
          { (count && fetching) ? <ErrorPage textToDisplay="Loading..."/> : null }
          { (count && !fetching) ? this.tile : null }
        </Box>
        {this.meter}
      </Section>
    );
  }
}


function mapStateToProps({ searchResults, search }) {
  return {
    search,
    searchResults,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchSwapi: payload => dispatch(searchSwapi(payload)),
    loadNextResults: payload => dispatch(loadNextResults(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
