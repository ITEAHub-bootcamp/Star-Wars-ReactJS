import React from 'react';
import { Tiles, Tile, Card, Box } from 'grommet';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import 'grommet/scss/vanilla/index.scss';
import { connect } from 'react-redux';

import imageLocal from '../assets/maxresdefault.jpg';

import { loadMoreResults, searchSwapi } from '../../../../actions/search';


class SearchContainer extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      loading: true,
      repositories: [],
      next: '',
    };
  }

  componentDidMount() {
    const properties = this.props.match.params;

    this.findItems(properties.type, properties.query);
  }

  componentWillReceiveProps(nextProps) {
    const properties = nextProps.match.params;

    this.findItems(properties);

    return true;
  }

  shouldComponentUpdate() {
    this.showDescription = this.showDescription.bind(this);
    return true;
  }

  showDescription(url) {
    const newUrl = url.split('https://swapi.co/api', '');

    this.props.history.replace(newUrl[1]);
  }

  checkCards() {
    const items = this.state.repositories;

    return items.map(
      (item) => {
        return (
          <Tile key={item.name} pad="medium" onClick={this.showDescription} >
            <Card thumbnail={imageLocal} heading={item.name} label={`${item.mass}`} description="Some description by Ksiu :-)" />
          </Tile>
        );
      });
  }

  checkNext() {
    const nextUrl = this.state.next;

    if (nextUrl && !this.state.loading) {
      this.setState({ loading: true },
        () => {
          fetch(nextUrl).then(
            (response) => {
              return response.json();
            }).then((array) => {
            this.setState(
              {
                loading: false,
                repositories: this.state.repositories.concat(array.results),
                next: array.next,
              },
              this.checkCards.bind(this));
          });
        });
    } else return null;
  }

  findItems(type, value) {
    this.props.searchSwapi(type, value);
  }

  render() {
    return (
      <Box flex justify="center">
        <Tiles flex justify="center" onMore={this.checkNext()}>
          {this.checkCards()}
        </Tiles>
      </Box>
    );
  }
}

SearchContainer.PropTypes = {
  history: PropTypes.object,
  match: PropTypes.object.isRequired,
};


function mapStateToProps({ search }) {
  return {
    search,
  };
}
function mapDispatchToProps( dispatch ) {
  return {
    searchSwapi: (payload) => {dispatch(searchSwapi(payload))},
    loadMoreResults: (payload) => {dispatch(loadMoreResults(payload))},
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchContainer));
