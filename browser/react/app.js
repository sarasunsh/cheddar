'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Sidebar from './components/Sidebar';
import App from './components/App';
import Video from './components/Video/Video';
import Login from './components/Login/Login';
import Landing from './components/Landing';

// import { fetchMiceFromServer } from './reducers/allMice';
// import { fetchMouseFromServer } from './reducers/singleMouse';
// import { fetchArmsFromServer } from './reducers/experiment';


// onEnter prompts ----------------------------------------------------



// React-Router--------------------------------------------------------
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <Route path="login" component={Login} />
        <Route path="video" component={Video}  />
        <IndexRoute component={Landing}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);


// ReactDOM.render(
//   <Provider store={store}>
//     <Router history={browserHistory}>
//       <Route path='/' component={App}>
//         <Route path="mice" component={AllMiceContainer} onEnter={onMiceEnter}/>
//         <Route path="mice/:mouseId" component={SingleMouseContainer} onEnter={onSingleMouseEnter} />
//         <Route path="addmouse" component={NewMouseFormContainer} />
//         <Route path="experiment" component={ExperimentPageContainer} onEnter={onExperimentEnter}/>
//         <Route path="chat" component={Chatroom}/>
//         <Route path="analytics" component={AnalyticsContainer} />
//         <Route path="gantt" component={Gantt} />
//         <IndexRoute component={Landing}/>
//       </Route>
//     </Router>
//   </Provider>,
//   document.getElementById('app')
// );
