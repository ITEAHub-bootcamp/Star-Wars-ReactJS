import React from 'react';
import { withRouter } from 'react-router-dom';

import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Box from 'grommet/components/Box';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';

import SearchH from './components/Search';

class SearchHeader extends React.Component {
  constructor(...args) {
    super(...args);
    this.private = {
      currentSearchQuery: '',
    }
    this.state = {
      currentResourceType: 'people',
      resourceTypes: [],
    };
    this.createAnchor = this.createAnchor.bind(this);
    this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
    this.searchData = this.searchData.bind(this);
  }
  get menu() {
    const { resourceTypes } = this.state;

    return this.state.resourceTypes.length ?
      <Menu
        inline={false}
        dropAlign={{ right: 'right', top: 'top' }}>
        {resourceTypes.map(
          type => (
            <Anchor
              key={type}
              className="swapi-menu-item"
              label={type}
              onClick={
                () => this.handleMenuItemClick(type)
              }
            >
              <h4>
                {type}
              </h4>
            </Anchor>
          ),
        )}
      </Menu> :
      'nothing'
  }
  componentWillMount() {
    window
      .fetch('https://swapi.co/api/')
      .then(res => res.json())
      .then(json => this.setState({ resourceTypes: Object.keys(json) }));
  }
  createAnchor(item, index) {
    return (
      <Anchor 
        key={index} 
        className={item === this.state.currentResourceType ? 'active' : ''} 
        onClick={(e) => this.handleMenuItemClick(item)}>
          {item}
      </Anchor>
    );
  }
  handleMenuItemClick(type) {
    this.props.history.replace(`/search/${type}/${this.private.currentSearchQuery || ' '}`);

    this.setState({ currentResourceType: type });
  }
  searchData(e) {
    const { currentResourceType } = this.state;
    let searchQuery = e.target.value
    this.props.history.replace(`/search/${currentResourceType}/${searchQuery || ' '}`);

    this.private.currentSearchQuery = searchQuery;
  }
  render() {
    return (
      <Header>
        <Title>
          Sample Title
        </Title>
        <Box
          flex
          justify="end"
          direction="row"
          responsive={false}>
          <SearchH
            placeHolder="search for"
            onDOMChange={this.searchData}
          />
          {this.menu}
        </Box>
      </Header>
    );
  }
}

export default withRouter(SearchHeader);
