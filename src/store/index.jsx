import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import customMiddleWare from '../middlewares';
import { logger } from '../middlewares/logger';

const middleware = [customMiddleWare, logger];

const enhancer =
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, enhancer);
}
