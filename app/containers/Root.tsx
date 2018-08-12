import * as React from 'react';
import * as Redux from 'redux';
import { History } from 'history';

import { Provider } from 'react-redux';
// import { ConnectedRouter } from 'react-router-redux';
import { BrowserRouter as Router } from 'react-router-dom'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import Routes from '../routes';

interface IRootType {
  store: Redux.Store<any>;
  history: History
};

export default function Root({ store, history }: IRootType) {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Routes />
      </Router>
    </Provider>
  );
}
