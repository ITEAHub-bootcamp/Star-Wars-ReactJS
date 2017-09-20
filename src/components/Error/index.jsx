import React from 'react';
import { Box, Status } from 'grommet/';
import Home from '../screens/Home';

class Error extends React.Component {
  render() {
    return (
      <div>
        <Status value="warning" />
        <Box state="Sample state" colorIndex="#ffd602">
          somethin went wrong
        </Box>
        <Home />
      </div>
    );
  }
}

export default Error;
