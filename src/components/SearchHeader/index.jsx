import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Header, Title, Box, Search, Menu, Anchor } from 'grommet';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import 'grommet/scss/vanilla/index.scss';
import Actions from 'grommet/components/icons/base/Apps';

import { loadData } from '../../actions/swapi';

// import SearchContainer from '../../screens/Search/components';

class SearchHeader extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      type: 'people',
      resourceTypes: [],
      anchor: '',
      location: 'search',
      typed: '',
    };

    this.typingSearch = this.typingSearch.bind(this);
  }

  componentWillMount() {
    this.props.actions.loadData();
  }

  changeLocation(link) {
    this.setState({ type: link }, this.changeRoute.bind(this));
  }

  typingSearch(e) {
    const value = e.target.value;
    this.setState({ typed: value }, this.changeRoute.bind(this));
  }

  anchor() {
    const items = Object.keys(this.props.swapi);

    const anchors = items.map(
      (item, index) => {
        return (
          <Anchor key={item} className={(index === 0) ? 'active' : ''} label={item} onClick={() => { this.changeLocation(item); }}>
            {item}
          </Anchor>);
      });

    return anchors;
  }

  changeRoute() {
    const currentLocation = (this.state.type) ? ('/' + this.state.type) : '';
    const currentTyped = (this.state.typed) ? ('/' + this.state.typed) : '';
    this.stringy = '/search' + currentLocation + currentTyped;

    if (!this.state.typed) {
      this.props.history.replace(currentLocation);
    } else {
      this.props.history.replace(this.stringy);
    }
  }

  render() {
    return (
      <Box>
        <Header pad="medium">
          <Anchor key="home" href="/">
            <Title>
              Star wars Api
            </Title>
          </Anchor>
          <Box flex justify="start" direction="row" responsive={false}>
            <Search inline fill size="medium" placeHolder="Search" dropAlign={{ right: 'right' }} onDOMChange={this.typingSearch} />
            <Menu icon={<Actions />} dropAlign={{ right: 'right' }}>
              {this.anchor()}
            </Menu>
          </Box>
        </Header>
      </Box>
    );
  }
}

SearchHeader.PropTypes = {
  history: PropTypes.object,
  actions: PropTypes.object,
};

const mapStateToProps = ({ swapi }) => ({
  swapi,
});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ loadData }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SearchHeader));
