import React from 'react';

import Section from 'grommet/components/Section';
import Headline from 'grommet/components/Headline';

class Films extends React.PureComponent {
  constructor(...args) {
    super(...args);

    this.state = {
      filmsList: [],
    };
  }

  componentWillMount() {
    window
      .fetch('https://swapi.co/api/films/')
      .then(res => res.json())
      .then(json => this.setState({ filmsList: json.results }));
  }

  render() {
    return (
      <Section>
        <Headline size="xlarge"> Films </Headline>
        {/* {this.film} */}
      </Section>
    );
  }
}

export default Films;
