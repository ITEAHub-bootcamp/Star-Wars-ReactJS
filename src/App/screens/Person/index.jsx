import React from 'react';

import Section from 'grommet/components/Section';
import Paragraph from 'grommet/components/Paragraph';
import Hero from 'grommet/components/Hero';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Tiles from 'grommet/components/Tiles';
import Tile from 'grommet/components/Tile';
import Card from 'grommet/components/Card';

import heroBg from './assets/star_wars_bg.jpg';

class Person extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      userId: this.props.location.pathname.split('/')[2],
      userData: [],
      homePlanet: '',
      filmsList: [],
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
        this.getFilms(json.films);
      });
  }
  getPlanetName(planetUrl) {
    window
      .fetch(planetUrl)
      .then(response => response.json())
      .then(json => this.setState({ homePlanet: json }));
  }

  getFilms(filmsUrl) {
    filmsUrl.map((filmUrl, index) =>
      window
        .fetch(filmUrl)
        .then(response => response.json())
        .then(json => this.setState({ filmsList: this.state.filmsList.concat([json]) })),
    );
  }

  get film() {
    console.log(this.state.filmsList);
    return this.state.filmsList && this.state.filmsList.length ?
      this.state.filmsList.map(film =>
        (<ListItem
          key={film.url}
          justify="between"
          separator="horizontal"
        >
          <span className="secondary">
            {film.title}, ({this.formatYear(film.release_date)})
          </span>
        </ListItem>
        ))
      :
      false;
  }
  formatYear(date) {
    let newDate = new Date(date);
    return newDate.getFullYear();
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
          <Tiles>
            <Tile>
              <Card
                heading={this.state.userData.name}
                label={this.state.homePlanet.name}
                colorIndex="grey-2-a"
              >
                <List>
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
              </Card>
            </Tile>
            <Tile>
              <Card
                label="Films"
                colorIndex="grey-2-a"
              >
                <List>
                  {this.film}
                </List>
              </Card>
            </Tile>)
          </Tiles>
        </Hero>
      </Section>
    );
  }
}

export default Person;
