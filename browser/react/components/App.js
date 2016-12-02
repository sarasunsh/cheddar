import React, { Component } from 'react';
import Navbar from './Navbar';

export default class App extends Component {

  render () {
    return (
      <div>
          <Navbar/>
          { this.props.children.props.location.pathname === '/' ?
          <div>{ this.props.children }</div>
          :
          <div className="container" id="main">
              <div className="row">
                  <div className="col-xs-2"></div>
                  <div className="col-xs-8">
                      { this.props.children }
                  </div>
                  <div className="col-xs-2"></div>
              </div>
          </div>
          }
      </div>
);
  }
}

// Read more about children route components here: https://github.com/reactjs/react-router-tutorial/tree/master/lessons/04-nested-routes
