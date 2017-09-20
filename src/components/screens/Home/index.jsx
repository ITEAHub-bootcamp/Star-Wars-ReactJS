import React from 'react';
import { Hero, Box, Image, Headline } from 'grommet/';

import hero from './assets/starwars-api.jpg';

class Home extends React.PureComponent {
  render() {
    return (
      <div>
        <div>
          <header />
        </div>
        <Hero
          background={
            <Image
              src={hero}
              fit="cover"
            />
          }
          backgroundColorIndex="dark"
          size="large"
        >
          <Box>
            <Headline
              margin="none"
              size="xlarge"
              strong
            >
              FEEL THE FORCE!
            </Headline>
          </Box>
        </Hero>
      </div>
    );
  }
}

export default Home;
