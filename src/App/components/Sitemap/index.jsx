import React from 'react';

import Footer from '../../../common/components/Footer';
import Anchor from '../../../common/components/Anchor';
import Title from '../../../common/components/Title';
import Box from '../../../common/components/Box';
import Menu from '../../../common/components/Menu';
import Paragraph from '../../../common/components/Paragraph';

import './index.scss';

class Sitemap extends React.Component {
  constructor(...args) {
    super(...args);

    this.copyrightYear = (new Date()).getUTCFullYear();
  }

  render() {
    return (
      <Footer
        className="swapi-sitemap"
        justify="between"
      >
        <Title>
          SWAPI
        </Title>
        <Box
          direction="row"
          align="center"
          pad={{ between: 'medium' }}
        >
          <Paragraph margin="none">
            infiman © {this.copyrightYear}
          </Paragraph>
          <Menu
            inline
            direction="row"
            size="small"
            dropAlign={{ right: 'right' }}
          >
            <Anchor path={{ path: '/', index: true }}>
              Home
            </Anchor>
            <Anchor path={{ path: '/films', index: true }}>
              Films
            </Anchor>
            <Anchor path={{ path: '/people', index: true }}>
              People
            </Anchor>
            <Anchor path={{ path: '/planets', index: true }}>
              Planets
            </Anchor>
            <Anchor path={{ path: '/species', index: true }}>
              Species
            </Anchor>
            <Anchor path={{ path: '/starships', index: true }}>
              Starships
            </Anchor>
            <Anchor path={{ path: '/vehicles', index: true }}>
              Vehicles
            </Anchor>
          </Menu>
        </Box>
      </Footer>
    );
  }
}

export default Sitemap;
