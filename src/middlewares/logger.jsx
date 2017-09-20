export const logger = ({ dispatch, getState }) => next => (action) => {
  // console.error('action', action.type, action);
  // console.error('dispatch', dispatch);
  // console.error('getState', getState);

  return next(action);
};

// export default logger;
