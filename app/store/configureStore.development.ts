import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history'
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
import { connectRouter, routerMiddleware } from 'connected-react-router'

// import * as actions from '../actions';

// declare const window: Window & {
//   __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?(a: any): void;
// };

declare const module: NodeModule & {
  hot?: {
    accept(...args: any[]): any;
  }
};

// const actionCreators = Object.assign({}, actions, {
//   push
// });

const logger = (<any>createLogger)({
  level: 'info',
  collapsed: true
});

export const history = createBrowserHistory();
const router = routerMiddleware(history);

const middleware = [
  thunk, 
  router, 
  process.env.NODE_ENV === 'development' && logger
].filter(Boolean)

// // If Redux DevTools Extension is installed use it, otherwise use Redux compose
// /* eslint-disable no-underscore-dangle */
// const composeEnhancers: typeof compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
//     // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
//     actionCreators
//   }) as any :
//   compose;

// /* eslint-enable no-underscore-dangle */
// const enhancer = composeEnhancers(
//   applyMiddleware(...middleware)
// )

export const configureStore: Function = (initialState: Object) => {
  // const store = createStore(rootReducer, initialState, enhancer);
  const store =  createStore(
    connectRouter(history)(rootReducer), // new root reducer with router state
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        ...middleware
      ),
    ),
  )


  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
    );
  }

  return store;
}

// export = {
//   history,
//   configureStore(initialState: Object) {
//     const store = createStore(rootReducer, initialState, enhancer);

//     if (module.hot) {
//       module.hot.accept('../reducers', () =>
//         store.replaceReducer(require('../reducers')) // eslint-disable-line global-require
//       );
//     }

//     return store;
//   }
// };
