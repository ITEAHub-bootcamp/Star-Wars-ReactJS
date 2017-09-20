import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tiles, Tile, Card, Box } from 'grommet';

import { loadPeople } from '../../../actions/people';

class People extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      selected: [],
    };
  }
  componentWillMount() {
    this.props.actions.loadPeople();
    console.log(this, 'will mount');
  }

  componentDidMount() {
  }

  checkCards() {
    const items = this.props.people;

    console.log(items, 'items');

    return items.map(
      (item) => {
        return (
          <Tile key={item.name} pad="medium" onClick={this.showDescription} >
            <Card thumbnail={imageLocal} heading={item.name} label={`${item.mass}`} description="Some description by Ksiu :-)" />
          </Tile>
        );
      });
  }

  render() {
    return (
      <div>
        <div>
          people
          <Box flex justify="center">
            <Tiles flex justify="center" >
              {this.checkCards()}
            </Tiles>
          </Box>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ people }) => ({
  people,
});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({ loadPeople }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(People);

