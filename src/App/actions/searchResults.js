import {
  SEARCH_SWAPI_STARTED,
  SEARCH_SWAPI_FAILED,
  SEARCH_SWAPI_SUCCESS,
} from '../constants';
import { getState } from '../store/store';
import { getSearchQuery, getSearchType } from './search';

const SWAPI_URL = 'https://swapi.co/api';

const initialState = {
  fetching: false,
  error: '',
  count: 0,
  next: null,
  previous: null,
  results: [],
};

function searchSwapiStarted(payload = { fetching: true }) {
  return {
    payload,
    type: SEARCH_SWAPI_STARTED,
  };
}

function searchSwapiSuccess(payload) {
  return {
    payload: Object.assign({}, payload, { fetching: false }),
    type: SEARCH_SWAPI_SUCCESS,
  };
}

function searchSwapiFailed(payload) {
  return {
    payload: Object.assign({}, payload, { fetching: false }),
    type: SEARCH_SWAPI_FAILED,
  };
}

export function searchSwapi(payload) {
  return (dispatch) => {
    dispatch(searchSwapiStarted(payload));

    return window
      .fetch(`${SWAPI_URL}/${getSearchType()}/?search=${getSearchQuery()}`)
      .then(res => res.json())
      .then(json => dispatch(searchSwapiSuccess(json)))
      .catch(error => dispatch(searchSwapiFailed({ error: error.message })));
  };
}

export function loadNextResults(payload){
  return (dispatch) => {
    const { results, next } = getState().searchResults ;
    dispatch(searchSwapiStarted(payload));
    return window
      .fetch(next)
      .then(res => res.json())
      .then(json => {
        dispatch(searchSwapiSuccess({
          count: json.count,
          next: json.next,
          previous: json.previous,
          results: Array.concat(results, json.results)
        }));
      })
      .catch(error => dispatch(searchSwapiFailed({ error:error.message })));
  }
}

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