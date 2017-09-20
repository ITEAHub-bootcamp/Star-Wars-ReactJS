import React from 'react';

class Films extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      films: [],
    };
  }

  componentWillMount() {
    fetch('https://swapi.co/api/films/').then((response) => {
      return response.json();
    }).then(
      (json) => {
        this.setState({ films: json });
      });
  }

  returnFilms() {
    const films = this.state.films;

    console.log(films);
    const filmsArray = films.results.map((film) => {
      return (<span>{film.title}</span>);
    });
    console.log(films);
    return filmsArray;
  }

  render() {
    return (
      <header>
        Films
        {/*{this.returnFilms()}*/}
      </header>
    );
  }
}

export default Films;
