 const customMiddleWare = ({ dispatch, getState }) => next => action => {

  // console.log(action, 'action');
  if (typeof action === 'function') {
    return action(dispatch, getState);
  }

  return next(action);
};

export default customMiddleWare;
