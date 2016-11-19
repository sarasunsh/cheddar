'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Sidebar from './components/Sidebar';
import App from './components/App';
import Video from './components/Video/Video';
import AuthContainer from './components/Auth/AuthContainer';
import SignupContainer from './components/Signup/SignupContainer';
import Landing from './components/Landing';

import {retrieveLoggedInUser} from './reducers/auth';

// onEnter prompts ----------------------------------------------------
function fetchInitialData () {
  store.dispatch(retrieveLoggedInUser());
}

function requireAuth (nextRouterState, replace){
  if (!localStorage.token) {
    replace({
      pathname: '/auth',
      state: { nextPathname: nextRouterState.location.pathname }
    })
  }
}

// React-Router--------------------------------------------------------
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App} onEnter={fetchInitialData}>
        <Route path="auth" component={AuthContainer} />
        <Route path="signup" component={SignupContainer} />
        <Route path="video" component={Video}  onEnter={requireAuth}/>
        <IndexRoute component={Landing}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
