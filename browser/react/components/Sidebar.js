'use strict';

import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Button, Popover, OverlayTrigger } from 'react-bootstrap';
import { logout } from '../reducers/auth'

class Sidebar extends React.Component {
    render(){
        return (
            <div>
                <Link to='/video'>Video</Link>
                <Button onClick={this.props.logoutClick}>Log out</Button>
            </div>
        )
    }
}

const mapDispatch = dispatch => ({
  logoutClick: () => {
    dispatch(logout());
  }
})
const SideBarContainer = connect(null, mapDispatch)(Sidebar);
export default SideBarContainer;
