import { GET_PEOPLE } from '../constants';

export const loadPeople = () => {
  return (dispatch, getState) => {
    const url = 'https://swapi.co/api/people';
    return fetch(url)
      .then(response => { return response.json(); })
      .then((people) => {
        return dispatch({
          type: GET_PEOPLE,
          payload: {
            people,
          },
        });
      }).catch((err) => {
        console.log(err);
      });
  };
};
