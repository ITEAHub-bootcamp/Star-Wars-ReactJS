import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Search from 'grommet/components/Search';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Heading from 'grommet/components/Heading';
import Drag from 'grommet/components/icons/base/Drag';

import {
  updateSearchType,
  updateSearchQuery,
  fetchSwapiTypes,
} from '../../actions/search';

import './index.scss';

class SearchHeader extends React.Component {
  constructor(...args) {
    super(...args);
    this.searchByAll = this.searchByAll.bind(this);
  }

  componentWillMount() {
   this.props.fetchSwapiTypes();
  }

  get menu() {
    const { types, fetching, error } = this.props.search;

    return(
        <Menu icon={!fetching ? <Drag /> : null}>
          {
            error ?
              <Heading tag="h4">
                {error}
              </Heading> :
              types.map(
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
              )
          }
        </Menu>
      )
  }

  setCurrentResourceType(type) {
    if (!type) return;
    const { query } = this.props.search;
    this.props.updateSearchType({ type });
    this.props.history.replace(`/search/${type}/${query || ' '}`);
    this.props.onResult(type, query || ' ');
  }

  getCurrentResourceType() {
    const { types, type } = this.props.search;
    return type || types[0] || '';
  }

  searchByAll(e) {
    window.clearTimeout(this.typingDelay);
    this.typingDelay = window.setTimeout(() => this.searchQuery(e.target.value), 500);
  }

  searchQuery(query) {
    const type = this.getCurrentResourceType();
    if (!type) return;
    this.props.updateSearchQuery({ query });
    this.props.history.replace(`/search/${type}/${query || ' '}`);
    this.props.onResult(type, query || ' ');
  }

  render() {
    return (
      <Header size="medium">
        <Title>
          <Anchor
            className="header-main"
            path="/"
          >
              SWAPI
          </Anchor>
        </Title>
        <Search
          inline
          fill
          size="medium"
          placeHolder="Search"
          onDOMChange={this.searchByAll}
          dropAlign={{ right: 'right' }}
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

function mapStateToProps({ search }) {
  return {
    search,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchSwapiTypes: payload => dispatch(fetchSwapiTypes(payload)),
    updateSearchType: payload => dispatch(updateSearchType(payload)),
    updateSearchQuery: payload => dispatch(updateSearchQuery(payload)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchHeader));
