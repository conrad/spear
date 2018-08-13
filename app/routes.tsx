import * as React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';

export default () => (
  <App>
    <Switch>
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);

{/* <Route exact path="/" render={() => (<div>Match</div>)} />
<Route render={() => (<div>Miss</div>)} /> */}
