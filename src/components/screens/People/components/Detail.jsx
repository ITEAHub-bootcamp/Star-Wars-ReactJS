import React from 'react';
import { Box, Headline, Image } from 'grommet/';
import { withRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Table from 'grommet/components/Table';
import TableRow from 'grommet/components/TableRow';
import Timestamp from 'grommet/components/Timestamp';

// import Person from './screens/People/components/Detail.jsx';

import imageLocal from '../../Search/assets/maxresdefault.jpg';

const swapiUrl = 'https://swapi.co/api';

class Person extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      url: swapiUrl + this.props.match.url,
      details: [],
      rows: '',
    };
  }

  componentWillMount() {
    fetch(this.state.url).then(
      (response) => {
        return response.json();
      }).then((array) => {
      const response = Object.keys(array).map(
        (key) => {
          return [key, array[key]];
        });

      this.setState({ details: response }, this.generateRows(response));
    });
  }

  shouldComponentUpdate() {
    return true;
  }

  itemGener(item) {
    let getGen = '';
    // console.log(item[1].includes(swapiUrl));

    if (item[0] === 'created' || item[0] === 'edited') {
      getGen = <Timestamp value={item[1]} />;
    } else if (item[1].constructor === Array) {
      if (!Array.isArray(item[1])) {
        console.log(item[1]);
        // getGen = <Link path={item[1]} />
        // getGen = <Route path="/peoples"  />
      }

      getGen = item[1].map(
        (elem) => {
          console.log('item', elem);

          return <Route path="/peoples" />;
        });

      // getGen = <Route path="/peoples"  />
    } else getGen = item[1];

    // console.log(getGen);
    // console.log(newName);
    console.log(item[1].length);

    return getGen;
  }

  generateRows(detail) {
    const rows = detail.map(
      (item) => {
        return (
          <TableRow key={item.name}>
            <td>
              {item[0]}
            </td>
            <td>
              {
                this.itemGener(item)
              }
            </td>
          </TableRow>
        );
      });

    this.setState({ rows });
  }

  render() {
    return (
      <div>
        <Box>
          <Headline
            margin="small"
            size="middle"
            strong
          >
            Person Details
          </Headline>

          <Image
            src={imageLocal}
            width="500"
          />
        </Box>

        <Table scrollable={false}>
          <thead>
            <tr>
              <th>
                Name
              </th>
              <th>
               Value
              </th>
            </tr>
          </thead>
          <tbody>

            { this.state.rows }

          </tbody>
        </Table>
      </div>
    );
  }
}

export default withRouter(Person);

Person.PropTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};
