import React from 'react';
import { connect } from 'react-redux';

import Section from 'grommet/components/Section';
import Tile from 'grommet/components/Tile';
import Box from 'grommet/components/Box';
import Meter from 'grommet/components/Meter';
import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';
import Tiles from 'grommet/components/Tiles';
import Value from 'grommet/components/Value';

import imgBg from './assets/personBg.jpg';

import { searchSwapi, loadNextResults } from '../../actions/searchResults';

class People extends React.PureComponent {
  constructor(...args) {
    super(...args);
    this.loadMoreResults = this.loadMoreResults.bind(this);
  }

  componentDidMount() {
    this.props.updateSearchType('people');
    this.props.searchSwapi();
  }

  componentWillReceiveProps(nextProps) {
    const { query } = this.props.search;
    if (nextProps.search.query !== query) {
      this.props.searchSwapi();
    }
  }

  get tile() {
    const { results, count } = this.props.searchResults;

    return results && results.length ?
      <Section>
        <Tiles
          onMore={this.state.peopleList.next ? this.loadMoreResults : null}
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
        <Box align="center">
          <Value
            value={results.length}
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
      </Section>
      : false;
  }

  loadMoreResults() {
    window
      .fetch(`${this.state.peopleList.next}`)
      .then(res => res.json())
      .then(json => this.setState({
        peopleList: {
          results: this.state.peopleList.results.concat(json.results),
          next: json.next,
        },
        loadedPeopleCount: this.state.loadedPeopleCount + json.results.length,
      },
      ));
  }

  render() {
    return (
      <div>
        {this.tile}
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(People);
