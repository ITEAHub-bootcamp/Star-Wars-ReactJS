import { GET_PEOPLE } from '../constants';

const people = (state = [], action) => {
  if (action.type === GET_PEOPLE) {
    return [...state, ...action.payload.people];
  } else return state;
};

export default people;
