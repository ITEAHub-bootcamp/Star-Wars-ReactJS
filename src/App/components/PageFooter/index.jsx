import React from 'react';

import Footer from 'grommet/components/Footer';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import Menu from 'grommet/components/Menu';
import Anchor from 'grommet/components/Anchor';

import './index.scss';

class PageFooter extends React.Component {
  render() {
    return (
      <Footer
        justify="between"
        size="small"
      >
        <Box
          direction="row"
          align="center"
          pad={{ between: 'medium' }}
        >
          <Paragraph margin="none">
            © 2017 ITEA
          </Paragraph>
          <Menu
            direction="row"
            size="small"
            dropAlign={{ right: 'right' }}
          >
            <Anchor path={{ path: '/people', index: true }}>
              People
            </Anchor>
            <Anchor path={{ path: '/planets', index: true }}>
              Planets
            </Anchor>
            <Anchor path={{ path: '/films', index: true }}>
              Films
            </Anchor>
            <Anchor path={{ path: '/species', index: true }}>
              Species
            </Anchor>
            <Anchor path={{ path: '/vehicles', index: true }}>
              Vehicles
            </Anchor>
            <Anchor path={{ path: '/starships', index: true }}>
              Starships
            </Anchor>
          </Menu>
        </Box>
      </Footer>
    );
  }
}

export default PageFooter;
