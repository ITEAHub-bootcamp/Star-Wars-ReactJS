import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import 'whatwg-fetch';

import ApplicationContainer from './App';

function render(Component) {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
}

render(ApplicationContainer);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(ApplicationContainer);
  });
}
