'use strict';

import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { Button, Popover, OverlayTrigger } from 'react-bootstrap';
import { logout } from '../reducers/auth'

class Navbar extends React.Component {
    render(){
        return (
          <nav>
            <div className="nav-wrapper">
                <Link className="brand-logo" to='/'> Cheddar </Link>
                <ul className="right hide-on-med-and-down">
                  {this.props.user ?
                  <li><Button className='btn' onClick={this.props.logoutClick}>Log out</Button></li>
                  :
                  <div>
                    <li><Link className='btn' to="/login">Log in</Link></li>
                    <li><Link className='btn' to="/signup">Sign Up</Link></li>
                  </div>
                  }
                </ul>
            </div>
          </nav>
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
const NavbarContainer = connect(mapStateToProps, mapDispatch)(Navbar);
export default NavbarContainer;
