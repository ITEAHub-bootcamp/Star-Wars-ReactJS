import GrommetTiles from 'grommet/components/Tiles';
import GrommetTile from 'grommet/components/Tile';

class Tiles extends React.Component {
  render() {
    return(
      <Tiles>
        <Tile>
          <Card thumbnail='/img/carousel-1.png'
            heading='Sample Heading'
            label='Sample Label'
            description='Sample description providing more details.' />
        </Tile>
        <Tile>
          <Card thumbnail='/img/carousel-1.png'
            heading='Sample Heading'
            label='Sample Label'
            description='Sample description providing more details.' />
        </Tile>
        <Tile>
          <Card thumbnail='/img/carousel-1.png'
            heading='Sample Heading'
            label='Sample Label'
            description='Sample description providing more details.' />
        </Tile>
        <Tile>
          <Card thumbnail='/img/carousel-1.png'
            heading='Sample Heading'
            label='Sample Label'
            description='Sample description providing more details.' />
        </Tile>
      </Tiles>
    )
  }
}

export default Tiles;
