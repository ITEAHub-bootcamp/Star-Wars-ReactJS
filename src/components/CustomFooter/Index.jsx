import React from 'react';
import { Link } from 'react-router-dom';

import Footer from 'grommet/components/Footer';
import { Menu, Title, Box, Paragraph } from 'grommet';

class CustomFooter extends React.PureComponent {
  render() {
    return (
      <Footer justify="between">
        <Title />
        <Box direction="row" align="center" pad={{ between: 'medium' }}>
          <Paragraph margin="none">
            © 2017 Swapi footer
          </Paragraph>
          <Menu direction="row" size="small" dropAlign={{ right: 'right' }}>
            <Link to="/planet">About</Link>
            <Link to="/planets">Planets</Link>
            <Link to="/species">Species</Link>
            <Link to="/vehicle">Vehicle</Link>
            <Link to="/people">People</Link>
          </Menu>
        </Box>
      </Footer>
    );
  }
}

export default CustomFooter;
