import React from 'react';
import PropTypes from 'prop-types';
import Hero from 'grommet/components/Hero';
import Image from 'grommet/components/Image';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';

import errorBg from './assets/error-404.jpg';

class ErrorPage extends React.Component {
  render() {
    return (
      <Hero
        size="large"
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
              {this.props.textToDisplay}
            </Heading>
          </Box>
        </Box>
      </Hero>
    );
  }
}

ErrorPage.defaultProps = {
  textToDisplay: 'Some error has occured',
};

ErrorPage.propTypes = {
  textToDisplay: PropTypes.string,
};

export default ErrorPage;
