import { createStore, compose, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import rootReducer from '../reducers';

const history = createBrowserHistory();

const configureStore: Function = (initialState: Object) => {
  return createStore(
    connectRouter(history)(rootReducer), // new root reducer with router state
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        // ... other middlewares ...
      ),
    ),
  )
}

export default configureStore
