import React from 'react';

import Section from 'grommet/components/Section';
import Heading from 'grommet/components/Heading';
import Hero from 'grommet/components/Hero';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';

import heroBg from './assets/star_wars_bg.jpg';

class Person extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      userId: this.props.location.pathname.split('/')[2],
      userData: [],
      homePlanet: '',
    };
    this.apiUrl = 'https://swapi.co/api/people';
  }

  componentWillMount() {
    window
      .fetch(`${this.apiUrl}/${this.state.userId}`)
      .then(res => res.json())
      .then((json) => {
        this.setState({ userData: json });
        this.getPlanetName(json.homeworld);
      });
  }
  getPlanetName(planetUrl) {
    window
      .fetch(planetUrl)
      .then(response => response.json())
      .then(json => this.setState({ homePlanet: json }));
  }

  render() {
    return (
      <Section>
        <Hero
          background={
            <Image
              src={heroBg}
              fit="cover"
              full
            />}
          backgroundColorIndex="dark"
          size="large"
        >
          <Box
            direction="row"
            justify="center"
          >
            <Box
              basis="1/2"
              align="end"
              pad="medium"
            />
            <Box
              basis="1/2"
              align="start"
              pad="medium"
            >
              <Box
                pad="medium"
                colorIndex="grey-2-a"
              >
                <Heading>
                  {this.state.userData.name}
                </Heading>
                <List>
                  <ListItem
                    justify="between"
                    separator="horizontal"
                  >
                    <span>
                      Homeworld:
                    </span>
                    <span className="secondary">
                      {this.state.homePlanet.name}
                    </span>
                  </ListItem>
                  <ListItem
                    justify="between"
                    separator="horizontal"
                  >
                    <span>
                      Birth year:
                    </span>
                    <span className="secondary">
                      {this.state.userData.birth_year}
                    </span>
                  </ListItem>
                  <ListItem justify="between">
                    <span>
                      Height:
                    </span>
                    <span className="secondary">
                      {this.state.userData.height}
                    </span>
                  </ListItem>
                  <ListItem justify="between">
                    <span>
                      Mass:
                    </span>
                    <span className="secondary">
                      {this.state.userData.mass}
                    </span>
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Box>
        </Hero>
      </Section>
    );
  }
}

export default Person;
