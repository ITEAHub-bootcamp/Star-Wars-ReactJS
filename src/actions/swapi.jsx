import { LOAD_SWAPI } from '../constants';

export const loadData = () => {
  return (dispatch) => {
    return fetch('https://swapi.co/api/').then(
      (response) => {
        return response.json();
      })
      .then(
        (swapi) => {
          return dispatch({
            type: LOAD_SWAPI,
            payload: swapi ,
          });
        });
  };
};
