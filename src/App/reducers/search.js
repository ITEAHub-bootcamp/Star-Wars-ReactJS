import {
  FETCH_SWAPI_TYPES_STARTED,
  FETCH_SWAPI_TYPES_FAILED,
  FETCH_SWAPI_TYPES_SUCCESS,
  UPDATE_SEARCH_TYPE,
  UPDATE_SEARCH_QUERY,
} from '../constants';

const initialState = {
  type: '',
  query: '',
  types: [],
  fetching: false,
  error: '',
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case FETCH_SWAPI_TYPES_STARTED:
      return Object.assign({}, state, payload);
    case FETCH_SWAPI_TYPES_SUCCESS:
      return Object.assign({}, state, payload);
    case FETCH_SWAPI_TYPES_FAILED:
      return Object.assign({}, state, payload);
    case UPDATE_SEARCH_TYPE:
      return Object.assign({}, state, payload);
    case UPDATE_SEARCH_QUERY:
      return Object.assign({}, state, payload);
    default:
      return state;
  }
}