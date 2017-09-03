import React from 'react';
import PropTypes from 'prop-types';

import Tile from '../../../../common/components/Tile';
import Card from '../../../../common/components/Card';

import sw from './assets/sw.jpg';

class SearchTile extends React.Component {
  render() {
    return (
      <Tile>
        <Card
          thumbnail={sw}
          heading={this.props.data.name}
          label={`${this.props.type}`}
          description="Sample description providing more details."
        />
      </Tile>
    );
  }
}

SearchTile.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  type: PropTypes.string.isRequired,
};

export default SearchTile;
