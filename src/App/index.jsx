import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'whatwg-fetch';

// import GrommetApp from 'grommet/components/App';
import 'grommet/scss/vanilla/index.scss';

import Home from './screens/Home';
import Films from './screens/Films';
import People from './screens/People';
import Planets from './screens/Planets';
import Search from './screens/Search';
import Species from './screens/Species';
import Starships from './screens/Starships';
import Vehicles from './screens/Vehicles';

import SearchHeader from './components/SearchHeader';

import './index.scss';

export default class App extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <section>
          <SearchHeader />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route strict path="/search/:type/:query" component={Search} />
            <Route path="/films" component={Films} />
            <Route path="/people" component={People} />
            <Route path="/planets" component={Planets} />
            <Route path="/species" component={Species} />
            <Route path="/starships" component={Starships} />
            <Route path="/vehicles" component={Vehicles} />
          </Switch>
        </section>
      </BrowserRouter>
    );
  }
}
