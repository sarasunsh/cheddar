'use strict';

import React, { Component } from 'react';

import Sidebar from '../components/Sidebar';

export default class App extends Component {

  render () {
    return (
      <div id="main" className="container-fluid">
        <div className="col-xs-2">
          <Sidebar />
        </div>
        <div className="col-xs-10">
          { this.props.children }
        </div>
      </div>
    );
  }
}

// Read more about children route components here: https://github.com/reactjs/react-router-tutorial/tree/master/lessons/04-nested-routes
