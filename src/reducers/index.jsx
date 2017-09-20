import { combineReducers } from 'redux';

import swapi from './swapi';
import people from './people';
import search from './search';

const rootReducer = combineReducers({
  swapi,
  people,
  search,
});

export default rootReducer;
