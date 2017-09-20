import {
  SWAPI_SEARCH_FAILED,
  SWAPI_SEARCH_STARTED,
  SWAPI_SEARCH_SUCCESS,
  SWAPI_LOAD_MORE_STARTED,
  SWAPI_LOAD_MORE_SUCCESS,
  SWAPI_LOAD_MORE_FAILED,
} from '../constants';

function searchStarted(payload = { loading: true }) {
  return {
    payload,
    type: SWAPI_SEARCH_STARTED,
  };
}

function searchSuccess(payload) {
  return {
    payload: Object.assign({}, payload, { loading: false }),
    type: SWAPI_SEARCH_SUCCESS,
  };
}

function searchFailed(payload) {
  return {
    payload: Object.assign({}, payload, { loading: false }),
    type: SWAPI_SEARCH_FAILED,
  };
}

export function searchSwapi(payload) {
  return (dispatch, getState) => {
    dispatch(searchStarted(payload));

    const currentState = getState().swapi;

    if (currentState.type && currentState.query) {

      return fetch(`https://swapi.co/api/${currentState.type}/?search=${currentState.query}`)
        .then(respone => response.json())
        .then(json => {
          dispatch(searchSuccess(json));
        })
        .catch(error => dispatch(searchFailed({error})));
    }
  };
}


function swapiLoadMoreStarted(payload = { fetching: true }) {
  return {
    payload,
    type: SWAPI_LOAD_MORE_STARTED,
  };
}

function swapiLoadMoreSuccess(payload) {
  return {
    payload: Object.assign({}, payload, { fetching: false}),
    type: SWAPI_LOAD_MORE_SUCCESS,
  };
}

function swapiLoadMoreFailed(payload) {
  return {
    payload: Object.assign({}, payload, { fetching: false }),
    type: SWAPI_LOAD_MORE_FAILED,
  };
}

export function loadMoreResults(payload) {
  return (dispatch, getState) => {
    const url = getState().swapi.next;
    const prevData = getState().swapi.results;

    dispatch(swapiLoadMoreStarted(payload));

    return fetch(url)
      .then(res => res.json())
      .then((json) => {
        const results = prevData.concat(json.results);
        const next = json.next;
        dispatch(swapiLoadMoreSuccess({results, next}));
      })
      .catch(error => dispatch(swapiLoadMoreFailed({error: error.message})));
  };
}