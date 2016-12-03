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
import AnalyticsContainer from './components/Analytics/AnalyticsContainer';
import Landing from './components/Landing';

import {retrieveLoggedInUser} from './reducers/auth';

// onEnter prompts ----------------------------------------------------
function fetchInitialData (type) {
  store.dispatch(retrieveLoggedInUser(type));
}

function requireUserAuth (nextRouterState, replace){
  fetchInitialData("user");
  if (!localStorage.token) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextRouterState.location.pathname }
    })
  } else if( localStorage.token === "adv") {
    replace({
      pathname: '/',
      state: { nextPathname: nextRouterState.location.pathname }
    })
  }
}

function requireAdvAuth (nextRouterState, replace){
  fetchInitialData("adv");
  if (!localStorage.token) {
    replace({
      pathname: '/adv_login',
      state: { nextPathname: nextRouterState.location.pathname }
    })
  } else if( localStorage.token === "user") {
    replace({
      pathname: '/',
      state: { nextPathname: nextRouterState.location.pathname }
    })
  }
}

// React-Router--------------------------------------------------------
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App} onChange={(prevState, nextState) => {
        if (nextState.location.action !== "POP") {
          window.scrollTo(0, 0);
        }
      }}>
        <Route path="login" component={LoginContainer} />
        <Route path="adv_login" component={AdvLoginContainer} />
        <Route path="ads" component={AdsContainer} onEnter={requireUserAuth} />
        <Route path="signup" component={SignupContainer} />
        <Route path="adv_signup" component={AdvSignupContainer} />
        <Route path="video" component={VideoContainer}  onEnter={requireUserAuth}/>
        <Route path="advertisers" component={AdvertisersContainer} onEnter={requireAdvAuth}/>
        <Route path="advertisers/:adID" component={AnalyticsContainer} onEnter={requireAdvAuth}/>
        <IndexRoute component={Landing}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
