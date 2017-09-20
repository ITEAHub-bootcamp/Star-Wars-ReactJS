import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'grommet/scss/vanilla/index.scss';
import Article from 'grommet/components/Article';

import SearchHeader from './SearchHeader';
import CustomFooter from './CustomFooter';
import Error from './Error';
import Home from './screens/Home';
import Films from './screens/Films';
import People from './screens/People';
import Person from './screens/People/components/Detail';
import Vehicles from './screens/Vehicles';
import Species from './screens/Species';
import Planets from './screens/Planets';
import Search from './screens/Search/components';

// import './index.scss';

class App extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Article>
          <SearchHeader />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/films" component={Films} />
            <Route path="/people" component={People} />
            <Route path="/people/:id" component={Person} />
            <Route path="/vehicle" component={Vehicles} />
            <Route path="/species" component={Species} />
            <Route path="/planets" component={Planets} />
            <Route path="/search/:type/:query" component={Search} />
            <Route path="/:error" component={Error} />
          </Switch>
          <CustomFooter />
        </Article>
      </BrowserRouter>
    );
  }
}

export default App;
