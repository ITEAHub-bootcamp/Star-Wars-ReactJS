import React from 'react';
import { withRouter } from 'react-router-dom';

import Header from 'grommet/components/Header';
import Title from 'grommet/components/Title';
import Search from 'grommet/components/Search';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';
import Heading from 'grommet/components/Heading';
import Drag from 'grommet/components/icons/base/Drag';

import './index.scss';

class SearchHeader extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      currentSearchQuery: ' ',
      currentResourceType: 'people',
      searchingTimeOut: 0,
      resourceTypes: [],
    };

    this.searchQuery = this.searchQuery.bind(this);
  }

  componentWillMount() {
    window
      .fetch('https://swapi.co/api/')
      .then(res => res.json())
      .then(json => this.setState({ resourceTypes: Object.keys(json) }));
  }

  get menu() {
    const { resourceTypes } = this.state;

    return resourceTypes.length ?
      <Menu icon={<Drag />} >
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
      <Menu />;
  }

  setCurrentResourceType(type) {
    const { currentSearchQuery } = this.state;
    this.setState({
      currentResourceType: type,
      currentSearchQuery: ' ',
    }, () => this.props.history.replace(`/search/${type}/${currentSearchQuery}` || ' '));
  }

  searchQuery(e) {
    const { currentResourceType, typingTimeout } = this.state;
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    this.typingTimeout = setTimeout(() => {
      this.setState({
        currentSearchQuery: e.target.value || ' ',
      }, () => this.props.history.replace(`/search/${currentResourceType}/${this.state.currentSearchQuery}` || ' '));
    }, 800);
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
          onDOMChange={this.searchQuery}
          dropAlign={{ right: 'right' }}
        />
        {this.menu}
      </Header>
    );
  }
}

export default withRouter(SearchHeader);
