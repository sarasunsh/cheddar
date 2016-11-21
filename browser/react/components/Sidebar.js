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
                {this.props.user ?
                <Button onClick={this.props.logoutClick}>Log out</Button>
                :
                <div>
                  <Link to="/login"><Button>Log in</Button></Link>
                  <Link to="/signup"><Button>Sign Up</Button></Link>
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
  user: state.auth
})

const mapDispatch = dispatch => ({
  logoutClick: () => {
    dispatch(logout());
  }
})
const SideBarContainer = connect(mapStateToProps, mapDispatch)(Sidebar);
export default SideBarContainer;
