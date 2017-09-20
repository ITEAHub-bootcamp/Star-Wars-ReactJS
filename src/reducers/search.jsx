import {
  SWAPI_SEARCH_FAILED,
  SWAPI_SEARCH_STARTED,
  SWAPI_SEARCH_SUCCESS,
  SWAPI_LOAD_MORE_STARTED,
  SWAPI_LOAD_MORE_SUCCESS,
  SWAPI_LOAD_MORE_FAILED,
} from '../constants';

export default function reducer(state = [], { type, payload }) {
  switch (type) {
    case SWAPI_SEARCH_FAILED:
      return Object.assign({}, state, payload);
    case SWAPI_SEARCH_STARTED:
      return Object.assign({}, state, payload);
    case SWAPI_SEARCH_SUCCESS:
      return Object.assign({}, state, payload);
    case SWAPI_LOAD_MORE_STARTED:
      return Object.assign({}, state, payload);
    case SWAPI_LOAD_MORE_SUCCESS:
      return Object.assign({}, state, payload);
    case SWAPI_LOAD_MORE_FAILED:
      return Object.assign({}, state, payload);
    default:
      return state;
  }
}
