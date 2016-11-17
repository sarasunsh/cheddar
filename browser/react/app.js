'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Sidebar from './components/Sidebar';
import App from './components/App';
import AllMiceContainer from './components/AllMice/AllMiceContainer';
import SingleMouseContainer from './components/SingleMouse/SingleMouseContainer';
import NewMouseFormContainer from './components/NewMouseForm/NewMouseFormContainer';
import ExperimentPageContainer from './components/Experiment/ExperimentPage';
import Chatroom from './components/Chatroom/Chatroom';
import AnalyticsContainer from './components/Analytics';
import Gantt from './components/Gantt';
import Landing from './components/Landing';

import { fetchMiceFromServer } from './ducks/allMice';
import { fetchMouseFromServer } from './ducks/singleMouse';
import { fetchArmsFromServer } from './ducks/experiment';


// onEnter prompts ----------------------------------------------------
const onMiceEnter = function () {
  const thunk = fetchMiceFromServer();
  store.dispatch(thunk);
};

const onSingleMouseEnter = function (nextRouterState) {
  const mouseId = nextRouterState.params.mouseId;
  const thunk = fetchMouseFromServer(mouseId);
  store.dispatch(thunk);
};

const onExperimentEnter = function () {
  const thunk = fetchArmsFromServer();
  store.dispatch(thunk);
};

// React-Router--------------------------------------------------------
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <Route path="mice" component={AllMiceContainer} onEnter={onMiceEnter}/>
        <Route path="mice/:mouseId" component={SingleMouseContainer} onEnter={onSingleMouseEnter} />
        <Route path="addmouse" component={NewMouseFormContainer} />
        <Route path="experiment" component={ExperimentPageContainer} onEnter={onExperimentEnter}/>
        <Route path="chat" component={Chatroom}/>
        <Route path="analytics" component={AnalyticsContainer} />
        <Route path="gantt" component={Gantt} />
        <IndexRoute component={Landing}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
