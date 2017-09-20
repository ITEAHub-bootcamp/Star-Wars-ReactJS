import {
  FETCH_SWAPI_TYPES_STARTED,
  FETCH_SWAPI_TYPES_FAILED,
  FETCH_SWAPI_TYPES_SUCCESS,
  UPDATE_SEARCH_TYPE,
  UPDATE_SEARCH_QUERY,
} from '../constants';
import store from '../store/store';

const SWAPI_URL = 'https://swapi.co/api/';

export function getSearch() {
  return store.getState().search;
}

export function getSearchQuery() {
  return getSearch().query;
}

export function getSearchType() {
  return getSearch().type;
}

export function updateSearchType(payload) {
  return {
    payload,
    type: UPDATE_SEARCH_TYPE,
  };
}

export function updateSearchQuery(payload) {
  return {
    payload,
    type: UPDATE_SEARCH_QUERY,
  };
}

function fetchSwapiTypesStarted(payload = { fetching: true }) {
  return {
    payload,
    type: FETCH_SWAPI_TYPES_STARTED,
  };
}

function fetchSwapiTypesSuccess(payload) {
  return {
    payload: Object.assign({}, payload, { fetching: false }),
    type: FETCH_SWAPI_TYPES_SUCCESS,
  };
}

function fetchSwapiTypesFailed(payload) {
  return {
    payload: Object.assign({}, payload, { fetching: false }),
    type: FETCH_SWAPI_TYPES_FAILED,
  };
}

export function fetchSwapiTypes(payload) {
  return (dispatch) => {
    dispatch(fetchSwapiTypesStarted(payload));

    return fetch(`${SWAPI_URL}`)
      .then(res => res.json())
      .then((json) => {
        const types = Object.keys(json);

        dispatch(updateSearchType({ type: types[0] || '' }));
        dispatch(fetchSwapiTypesSuccess({ types }));
      })
      .catch(error => dispatch(fetchSwapiTypesFailed({ error: error.message })));
  };
}
