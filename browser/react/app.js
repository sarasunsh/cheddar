'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Sidebar from './components/Sidebar';
import App from './components/App';
import Video from './components/Video/Video';
import AuthContainer from './components/Auth/Auth';
import Landing from './components/Landing';

import {retrieveLoggedInUser} from './reducers/auth';

// onEnter prompts ----------------------------------------------------
function fetchInitialData () {
  store.dispatch(retrieveLoggedInUser());
}


// React-Router--------------------------------------------------------
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App} onEnter={fetchInitialData}>
        <Route path="auth" component={AuthContainer} />
        <Route path="video" component={Video}  />
        <IndexRoute component={Landing}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
