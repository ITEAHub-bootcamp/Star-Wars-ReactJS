import React from 'react';
import { withRouter } from 'react-router-dom';

import GrommetSearch from 'grommet/components/Search';

class Search extends React.Component {
  render() {
    return (
      <GrommetSearch {...this.props}/>
    );
  }
}

Search.defaultProps = {
  fill: true,
  inline: true,
  dropAlign: {
    right: 'right',
    top: 'top',
  },
};

export default Search;
