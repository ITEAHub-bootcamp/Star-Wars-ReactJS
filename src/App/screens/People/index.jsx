import React from 'react';

import Section from 'grommet/components/Section';
import Tile from 'grommet/components/Tile';
import Box from 'grommet/components/Box';
import Meter from 'grommet/components/Meter';
import Card from 'grommet/components/Card';
import Anchor from 'grommet/components/Anchor';
import Tiles from 'grommet/components/Tiles';
import Value from 'grommet/components/Value';

import imgBg from './assets/personBg.jpg';

class People extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      peopleList: [],
      loadedPeopleCount: 0,
      totalPeopleCount: 0,
    };
    this.apiUrl = 'https://swapi.co/api/people';
    this.loadMoreResults = this.loadMoreResults.bind(this);
  }

  componentWillMount() {
    window
      .fetch(`${this.apiUrl}`)
      .then(res => res.json())
      .then((json) => {
        console.log(json, 'js');
        this.setState({
          peopleList: json,
          loadedPeopleCount: json.results.length,
          totalPeopleCount: json.count,
        });
      });
  }

  get tile() {
    return this.state.peopleList.results && this.state.peopleList.results.length ?
      <Section>
        <Tiles
          onMore={this.state.peopleList.next ? this.loadMoreResults : null}
          fill
        >
          {this.state.peopleList.results.map(item => (
            <Tile key={item.url}>
              <Anchor path={{ path: `/people/${item.url.split('/')[5]}`, index: true }}>
                <Card
                  thumbnail={imgBg}
                  heading={item.name}
                />
              </Anchor>
            </Tile>
          ))}
        </Tiles>
        <Box align="center">
          <Value
            value={this.state.loadedPeopleCount}
            size="small"
            align="start"
          />
          <Meter
            vertical={false}
            size="small"
            value={this.state.loadedPeopleCount}
            max={this.state.totalPeopleCount}
          />
        </Box>
      </Section>
      : false;
  }

  loadMoreResults() {
    window
      .fetch(`${this.state.peopleList.next}`)
      .then(res => res.json())
      .then(json => this.setState({
        peopleList: {
          results: this.state.peopleList.results.concat(json.results),
          next: json.next,
        },
        loadedPeopleCount: this.state.loadedPeopleCount + json.results.length,
      },
      ));
  }

  render() {
    return (
      <div>
        {this.tile}
      </div>
    );
  }
}

export default People;
