import { LOAD_SWAPI } from '../constants';

const swapi = (state = {}, action) => {
  if (action.type === LOAD_SWAPI) {
    return action.payload;
  } else {
    return state;
  }
};

export default swapi;
