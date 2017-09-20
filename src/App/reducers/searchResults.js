import {
  SEARCH_SWAPI_STARTED,
  SEARCH_SWAPI_FAILED,
  SEARCH_SWAPI_SUCCESS,
} from '../constants';

const initialState = {
  fetching: false,
  error: '',
  count: 0,
  next: null,
  previous: null,
  results: [],
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SEARCH_SWAPI_STARTED:
      return Object.assign({}, state, payload);
    case SEARCH_SWAPI_SUCCESS:
      return Object.assign({}, state, payload);
    case SEARCH_SWAPI_FAILED:
      return Object.assign({}, state, payload);
    default:
      return state;
  }
}