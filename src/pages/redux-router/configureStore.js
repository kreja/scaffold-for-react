'use strict';

import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import rootReducer from './reducers';


// 一个中间件
const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      logger,
      thunkMiddleware
    )
  );
}


export default configureStore;

// 或者导出增强过的 createStore，外面就跟 createStore 一样使用即可
// const createStoreWithMdware = applyMiddleware(
//   logger,
//   thunkMiddleware
// )(createStore);
// export default createStoreWithMdware;
