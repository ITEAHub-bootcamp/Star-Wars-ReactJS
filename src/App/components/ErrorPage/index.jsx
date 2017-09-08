import React from 'react';

import Hero from 'grommet/components/Hero';
import Image from 'grommet/components/Image';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';

import errorBg from './assets/error-404.jpg';

class ErrorPage extends React.Component {
  render() {
    return (
      <Hero
        background={<Image
          src={errorBg}
          fit="cover"
          full
          size="large"
        />}
        backgroundColorIndex="dark"
      >
        <Box
          direction="row"
          justify="center"
          align="center"
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
            <Heading
              margin="none"
            >
              Sample Heading
            </Heading>
          </Box>
        </Box>
      </Hero>
    );
  }
}

export default ErrorPage;
