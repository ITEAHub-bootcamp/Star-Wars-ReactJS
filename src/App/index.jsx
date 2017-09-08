import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import 'grommet/scss/vanilla/index.scss';

import App from 'grommet/components/App';
import Article from 'grommet/components/Article';
import Home from './screens/Home';
import Films from './screens/Films';
import Planets from './screens/Planets';
import People from './screens/People';
import Person from './screens/Person';
import Species from './screens/Species';
import Starships from './screens/Starships';
import Search from './screens/Search';
import Vehicles from './screens/Vehicles';
import SearchHeader from './components/SearchHeader';
import PageFooter from './components/PageFooter';
import ErrorPage from './components/ErrorPage';

import './index.scss';

class ApplicationContainer extends React.PureComponent {
  render() {
    return (
      <App centered={false}>
        <Article>
          <BrowserRouter>
            <SearchHeader />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/search/:type/:query" component={Search} />
              <Route path="/films" component={Films} />
              <Route exact path="/people" component={People} />
              <Route path="/planets" component={Planets} />
              <Route path="/species" component={Species} />
              <Route path="/starships" component={Starships} />
              <Route path="/vehicles" component={Vehicles} />
              <Route path="/people/:id" component={Person} />
              <Route path="/:error" component={ErrorPage} />
            </Switch>
            <PageFooter />
          </BrowserRouter>
        </Article>
      </App>
    );
  }
}

export default ApplicationContainer;
