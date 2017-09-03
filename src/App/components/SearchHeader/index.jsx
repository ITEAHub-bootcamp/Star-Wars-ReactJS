import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Header from '../../../common/components/Header';
import Heading from '../../../common/components/Heading';
import Search from '../../../common/components/Search';
import Menu from '../../../common/components/Menu';
import Anchor from '../../../common/components/Anchor';
import Spinning from '../../../common/components/Spinning';

import './index.scss';

const DELAY = 333;

class SearchHeader extends React.Component {
  constructor(...args) {
    super(...args);

    this.private = {
      throttleTimeout: -1,
      currentSearchQuery: '',
    };

    this.state = {
      currentResourceType: '',
      resourceTypes: [],
    };

    this.onHeaderSearch = this.onHeaderSearch.bind(this);
  }

  componentWillMount() {
    window
      .fetch('https://swapi.co/api/')
      .then(res => res.json())
      .then((json) => {
        const resourceTypes = Object.keys(json);

        this.setState({
          resourceTypes,
          currentResourceType: resourceTypes[0] || '',
        });
      });
  }

  onHeaderSearch(e) {
    window.clearTimeout(this.private.throttleTimeout);

    this.private.throttleTimeout = window.setTimeout(() => this.search(e.target.value), DELAY);
  }

  setCurrentResourceType(type) {
    if (!type) return;

    const { currentSearchQuery } = this.private;
    this.props.history.replace(`/search/${type}/${currentSearchQuery || ' '}`);

    this.setState({ currentResourceType: type });

    this.props.onResult(type, currentSearchQuery || ' ');
  }

  get menu() {
    const { resourceTypes } = this.state;

    return this.state.resourceTypes.length ?
      <Menu>
        {resourceTypes.map(
          type => (
            <Anchor
              key={type}
              className="swapi-menu-item"
              label={type}
              onClick={
                () => this.setCurrentResourceType(type)
              }
            >
              <Heading tag="h4">
                {type}
              </Heading>
            </Anchor>
          ),
        )}
      </Menu> :
      <Menu icon={<Spinning />} />;
  }

  search(searchQuery) {
    const { currentResourceType } = this.state;

    if (!currentResourceType) return;

    this.props.history.replace(`/search/${currentResourceType}/${searchQuery || ' '}`);

    this.private.currentSearchQuery = searchQuery;

    this.props.onResult(currentResourceType, searchQuery || ' ');
  }

  render() {
    return (
      <Header className="swapi-search-header">
        <Anchor path={{ path: '/', index: true }}>
          <Heading>
            SWAPI
          </Heading>
        </Anchor>
        <Search
          placeHolder={`Embrace the world of Star Wars! Search for ${this.state.currentResourceType}...`}
          onDOMChange={this.onHeaderSearch}
        />
        {this.menu}
      </Header>
    );
  }
}

SearchHeader.propTypes = {
  history: React.PropTypes.shape({
    replace: React.PropTypes.func.isRequired,
  }).isRequired,
  onResult: PropTypes.func,
};

SearchHeader.defaultProps = {
  onResult() {},
};

export default withRouter(SearchHeader);
