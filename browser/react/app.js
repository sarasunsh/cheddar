'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
 
import AdsContainer from './components/Ads/AdsContainer';
import Navbar from './components/Navbar.js';
import App from './components/App';
import VideoContainer from './components/Video/VideoContainer';
import LoginContainer from './components/Login/LoginContainer';
import SignupContainer from './components/Signup/SignupContainer';
import AdvLoginContainer from './components/AdvLogin/LoginContainer';
import AdvSignupContainer from './components/AdvSignup/SignupContainer';

import AdvertisersContainer from './components/Advertisers/AdvertisersContainer';
import Landing from './components/Landing';
import Analytics from './components/Analytics';

import {retrieveLoggedInUser} from './reducers/auth';

// onEnter prompts ----------------------------------------------------
function fetchInitialData () {
  store.dispatch(retrieveLoggedInUser());
}

function requireAuth (nextRouterState, replace){
  fetchInitialData();
  if (!localStorage.token) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextRouterState.location.pathname }
    })
  }
}

// React-Router--------------------------------------------------------
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <Route path="login" component={LoginContainer} />
        <Route path="adv_login" component={AdvLoginContainer} />
        <Route path="ads" component={AdsContainer} onEnter={requireAuth} />
        <Route path="signup" component={SignupContainer} />
        <Route path="adv_signup" component={AdvSignupContainer} />
        <Route path="video" component={VideoContainer}  onEnter={requireAuth}/>
        <Route path="advertisers" component={AdvertisersContainer} onEnter={requireAuth}/>
        <Route path="metrics" component={Analytics}/>
        <IndexRoute component={Landing}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
