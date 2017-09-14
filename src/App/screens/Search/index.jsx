import React from 'react';
import PropTypes from 'prop-types';

// import Tiles from './components/Tiles';

import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';

class Search extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      searchQuery: this.props.match.params.query,
      searchType: this.props.match.params.type,
      searchData: {}
    };
    
    this.onMore = this.onMore.bind(this);
  }
  
  get searchItems() {
    const { results } = this.state.searchData;

    return !!results && results.length ? 
      <Tiles onMore={this.onMore} fill={true}>
        {results.map(
          (item, index) => (
            <Tile key={index}>
              <Card 
                thumbnail='https://vignette2.wikia.nocookie.net/starwars/images/f/f4/NelvaanPlanet.jpg/revision/latest?cb=20061119160119'
                heading={item.name}
                description='Sample description providing more details.' />
            </Tile>
          ),
        )}
      </Tiles> : 
      'nothing'
  }

  componentDidMount() {
    const { params } = this.props.match;

    this.search(params.type, params.query);
  }

  componentWillReceiveProps(nextProps) {
    const { params } = nextProps.match;

    this.setState({
      searchType: params.type,
      searchQuery: params.query,
      searchData: {},
    });

    this.search(params.type, params.query);
  }

  search(type, query) {
    window
      .fetch(`https://swapi.co/api/${type}/?search=${query}`)
      .then(res => res.json())
      .then(json => this.setState({ searchData: json, searchQuery: query, searchType: type }));
  }
  
  onMore() {
    this.getMoreItems(this.state.searchData.next);
  }
  
  getMoreItems(next) {
    const nextLink = next;
    if(!nextLink) {
      this.onMore = null;
    }
    else {
      window
        .fetch(nextLink)
        .then(res => res.json())
        .then(json => this.setState({ 
          searchData: {
            count: json.count,
            next: json.next,
            results: [...this.state.searchData.results, ...json.results],
          }, 
          searchQuery: json.query, 
          searchType: json.type 
        })
      );
    }
  }

  render() {
    return (
      <div>{this.searchItems}</div>
    );
  }
}

export default Search;
